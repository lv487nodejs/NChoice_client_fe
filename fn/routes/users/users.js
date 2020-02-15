const express = require('express');
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            throw { message: 'User doesnt exist' };
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await UserModel.findOne({ email });
        if (user) {
            throw { message: 'User already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.status(200).save();

        res.status(200).send({ message: 'User saved', user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send('Success');
        } else {
            res.status(200).send('Not allowed');
        }
    } catch (err) {
        req.status(500).send(err.message);
    }
});

module.exports = router;
