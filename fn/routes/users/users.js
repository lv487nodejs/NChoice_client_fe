const express = require('express');
const bcrypt = require('bcryptjs');
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
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post('/', userValidationRules(), validate, async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(200).send({ message: 'User saved', user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router;
