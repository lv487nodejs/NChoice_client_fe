const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const { generateRefreshToken, generateAccessToken } = require('../../utils/token');
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

    if(!user.confirmedEmail) {
        return next(
            new ErrorResponse('Email not confirmed.', 401)
        );
    }

    const userName = { name: user.email };
    const accessToken = generateAccessToken(userName);
    const refreshToken = generateRefreshToken(userName);

    user.tokens = [];
    user.tokens.push(refreshToken);
    await user.save();
    res.send({ accessToken, refreshToken, userId: user._id, cart: user.cart });
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

const emailConfirmation = asyncHandler(async (req, res, next) => {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.EMAIL_TOKEN_SECRET);

    const user = await Users.findOne({ email: decoded.name });

    if(!user) {
        return next(
            new ErrorResponse('Token is not valid', 403)
        );
    }

    user.confirmedEmail = true;

    await Users.findByIdAndUpdate(user._id, user);

    res.status(200).send('Email confirmed');
});

module.exports = {
    loginUser,
    loginAdmin,
    getToken,
    logout,
    emailConfirmation,
};
