const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenValidation = require('../../middleware/auth');

const Users = require('../../models/User');

const { userValidationRules, validate } = require('../../middleware/validator');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await Users.find();
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);
        if (!user) {
            throw { message: 'User doesnt exist' };
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
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post('/register', userValidationRules(), validate, async (req, res) => {
    const { firstName, lastName, email, password, role, cart } = req.body;

    if (cart) {
        cart.cartNumbers = parseInt(cart.cartNumbers);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Users({
            firstName,
            lastName,
            email,
            role,
            password: hashedPassword,
            cart,
        });

        const userName = { name: user.email };
        const accessToken = generateAccessToken(userName);
        const refreshToken = jwt.sign(userName, process.env.REFRESH_TOKEN_SECRET);

        user.tokens = [];
        user.tokens.push(refreshToken);
        await user.save();
        res.status(200).send({ message: 'User saved', user, accessToken, refreshToken });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.put('/cart/:id', async (req, res) => {
    const { id } = req.params;
    const { cart } = req.body;
    try {
        const userToUpdate = await Users.findById(id);
        userToUpdate.cart = cart;
        const updatedUser = await Users.findByIdAndUpdate(id, userToUpdate);
        const userToSend = await Users.findById(id);
        res.status(200).send(userToSend);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put('/role/:id', async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    try {
        const userToUpdate = await Users.findByIdAndUpdate(id, user);
        const updatedUser = await Users.findById(userToUpdate.id);
        console.log(updatedUser);
        res.status(200).send(updatedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});
// change user data
router.put('/:id', userValidationRules(), tokenValidation, async (req, res) => {
    const { id } = req.params;
    const userToUpdate = req.body.user;
    const { password } = userToUpdate
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        userToUpdate.password = hashedPassword
        const user = await Users.findByIdAndUpdate(id, userToUpdate);
        if (!user) {
            throw { message: 'User doesnt exist' };
        }
        await user.save();
        res.status(200).send({ msg: 'user data successfully changed', user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

const generateAccessToken = userName => jwt.sign(userName, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

module.exports = router;
