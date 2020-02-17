require('dotenv').config();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../../models/User');
const { userLoginValidationRules, validate } = require('../../middleware/validator');

let refreshTokens = [];

const router = express.Router();

router.post('/login', userLoginValidationRules(), validate, async (req, res) => {
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

        refreshTokens.push(refreshToken);
        res.json({ accessToken, refreshToken });
    } catch (err) {
        req.status(500).send(err.message);
    }
});

router.post('/token', (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken });
    });
});

router.delete('/logout', async (req, res) => {
    try {
        refreshTokens = refreshTokens.filter(token => token !== req.body.token);
        res.sendStatus(204);
    } catch (err) {
        req.status(500).send(err.message);
    }
});

function generateAccessToken(userName) {
    return jwt.sign(userName, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
}

module.exports = router;
