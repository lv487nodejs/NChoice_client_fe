require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../../models/User');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');


const loginUser = asyncHandler(async (req, res, next) => {
    const { password, email } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).send({ errors: [{ msg: 'Cannot find user with such email.' }] });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).send({ errors: [{ msg: 'User password is incorrect.' }] });
        }
        const userName = { name: user.email };
        const accessToken = generateAccessToken(userName);
        const refreshToken = jwt.sign(userName, process.env.REFRESH_TOKEN_SECRET);

        user.tokens = [];
        user.tokens.push(refreshToken);
        await user.save();
        res.send({ accessToken, refreshToken, userId: user._id });
    } catch (err) {
        req.status(500).send(err.message);
    }
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
    const name = user.email;
    const accessToken = generateAccessToken({ name });
    const refreshToken = jwt.sign({ name }, process.env.REFRESH_TOKEN_SECRET);
    res.status(200).send({ accessToken, refreshToken, user });
});

const getToken = asyncHandler(async (req, res, next) => {
    const refreshToken = req.body.token;
    const { email } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (refreshToken == null) return res.sendStatus(401);
        if (!user.tokens.includes(refreshToken)) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, err => {
            if (err) return res.sendStatus(403);
            const accessToken = generateAccessToken({ name: email });
            res.send({ accessToken });
        });
    } catch (error) {
        res.send(error);
    }
});

const logout = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ email });
        user.tokens = [];
        await user.save();
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const generateAccessToken = userName => jwt.sign(userName, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

module.exports = {
    loginUser,
    loginAdmin,
    getToken,
    logout,
};

