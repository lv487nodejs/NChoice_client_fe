const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../../models/User');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');


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
    const refreshToken = jwt.sign(userName, process.env.REFRESH_TOKEN_SECRET);

    user.tokens = [];
    user.tokens.push(refreshToken);
    await user.save()
    const mappedUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        date: user.date,
        tokens: user.tokens,
        role: user.role,
        wishlist: user.wishlist,
        cart: user.cart
    }
    res.status(200).send({ accessToken, refreshToken, user: mappedUser });
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
    const refreshToken = jwt.sign(userName, process.env.REFRESH_TOKEN_SECRET);

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

const generateAccessToken = userName => jwt.sign(userName, process.env.ACCESS_TOKEN_SECRET);

module.exports = {
    updateUser,
    updateUserRole,
    registerUser,
    getUser,
    getUsers,
};
