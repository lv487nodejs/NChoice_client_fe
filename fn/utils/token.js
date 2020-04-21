const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = payload => {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    return token;
};

const generateRefreshToken = payload => {
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    return token;
};

module.exports = {
    generateRefreshToken,
    generateAccessToken,
};
