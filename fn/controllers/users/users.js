const bcrypt = require('bcryptjs');

const Users = require('../../models/User');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const { generateRefreshToken,  generateAccessToken } = require('../../utils/token');

const getUsers = asyncHandler(async (req, res, next) => {
    const user = await Users.find();
    res.status(200).send(user);
});

const getUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (!user) {
        return next(
            new ErrorResponse('User doesnt exist.', 404)
        );
    }

    const userName = { name: user.email };
    const accessToken = generateAccessToken(userName);
    const refreshToken = generateRefreshToken(userName);

    user.tokens = [];
    user.tokens.push(refreshToken);
    await user.save()

    res.status(200).send({ accessToken, refreshToken, user });
});

const registerUser = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    const userName = { name: user.email };
    const accessToken = generateAccessToken(userName);
    const refreshToken = generateRefreshToken(userName);

    user.tokens = [];
    user.tokens.push(refreshToken);
    await user.save();
    res.status(200).send({ message: 'User saved', user, accessToken, refreshToken });
});

const updateUserRole = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req.body;
    const userToUpdate = await Users.findByIdAndUpdate(id, user);
    if (!userToUpdate) {
        return next(
            new ErrorResponse('User doesnt exist.', 404)
        );
    }
    const updatedUser = await Users.findById(userToUpdate.id);
    res.status(200).send(updatedUser);
});

const updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userToUpdate = req.body.user;
    const { password } = userToUpdate
    const hashedPassword = await bcrypt.hash(password, 10);
    userToUpdate.password = hashedPassword
    const user = await Users.findByIdAndUpdate(id, userToUpdate);
    if (!user) {
        return next(
            new ErrorResponse('User doesnt exist.', 404)
        );
    }
    await user.save();
    res.status(200).send({ msg: 'user data successfully changed', user });
});

module.exports = {
    updateUser,
    updateUserRole,
    registerUser,
    getUser,
    getUsers,
};
