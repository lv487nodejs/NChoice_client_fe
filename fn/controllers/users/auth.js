const bcrypt = require('bcryptjs');
const passport = require('passport')
const passportSetup = require('../../config/passport-config')
const Users = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const { generateRefreshToken,  generateAccessToken } = require('../../utils/token');
require('dotenv').config();

const loginUser = asyncHandler(async (req, res, next) => {
    const { password, email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
        return next(
            new ErrorResponse('Cannot find user with such email.', 404)
        );
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        return next(
            new ErrorResponse('User password is incorrect', 401)
        );
    }
    const userName = { name: user.email };
    const accessToken = generateAccessToken(userName);
    const refreshToken = generateRefreshToken(userName);

    user.tokens = [];
    user.tokens.push(refreshToken);
    await user.save();
    res.send({ accessToken, refreshToken, userId: user._id });
});

const loginAdmin = asyncHandler(async (req, res, next) => {
    const { password, email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
        return next(
            new ErrorResponse('User does not exist', 404)
        );
    }
    if (user.role !== 'admin') {
        return next(
            new ErrorResponse(`Role ${user.role} is not authorized to access this route`, 401)
        );
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        return next(
            new ErrorResponse('User password is incorrect.', 401)
        );
    }
    const userName = { name: user.email };
    const accessToken = generateAccessToken(userName);
    const refreshToken = generateRefreshToken(userName);
    res.status(200).send({ accessToken, refreshToken, user });
});

const getToken = asyncHandler(async (req, res, next) => {
    const refreshToken = req.body.token;
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (refreshToken == null) {
        return next(
            new ErrorResponse('No refresh token.', 400)
        );
    }
    if (!user.tokens.includes(refreshToken)) {
        return next(
            new ErrorResponse('Refresh token is not valid', 403)
        );
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, err => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: email });
        res.send({ accessToken });
    });
});

const logout = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
        return next(
            new ErrorResponse('User doesnt exist', 404)
        );
    }
    user.tokens = [];
    await user.save();
    res.sendStatus(204);
});

const googleAuth = asyncHandler(passport.authenticate('google', {
    scope: ['profile']
}))

const googleRedirect = asyncHandler(async (req, res) => {
    res.send('you reached callback url')
})

module.exports = {
    loginUser,
    loginAdmin,
    getToken,
    logout,
    googleAuth
};