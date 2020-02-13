const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../../models/User');

const router = express.Router();
// @route   POST api/users
// @desc    Test route
// @access  Public
// router.post(
//     '/',
//     [
//         check('name', 'Name is required')
//             .not()
//             .isEmpty(),
//         check('email', 'Please include a valid email').isEmail(),
//         check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//
//         const { name, email, password } = req.body;
//         try {
//             let user = await UserModel.findOne({ email });
//             if (user) {
//                 return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
//             }
//
//             user = new UserModel({
//                 name,
//                 email,
//                 password,
//             });
//
//             const salt = await bcrypt.genSalt(10);
//
//             user.password = await bcrypt.hash(password, salt);
//
//             await user.save();
//
//             const payload = {
//                 user: {
//                     id: user.id,
//                 },
//             };
//
//             jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
//                 if (err) throw err;
//                 res.json({ token });
//             });
//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send('Server error');
//         }
//     }
// );

router.get('/', async (req, res) => {
    try {
        const user = await UserModel.find();
        return res.json(user);
    } catch (err) {
        return console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send('Usere dont exist');
        }
        return res.json(user);
    } catch (err) {
        return console.log(err);
    }
});

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        user = new UserModel({
            firstName,
            lastName,
            email,
            password,
        });
        await user.save();

        return res.json({ msg: 'User saved', user });
    } catch (err) {
        return console.log(err);
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    try {
        const userToUpdate = await UserModel.findById(id);
        if (firstName) {
            userToUpdate.firstName = firstName;
        }
        if (lastName) {
            userToUpdate.lastName = lastName;
        }
        if (email) {
            userToUpdate.email = email;
        }
        if (password) {
            userToUpdate.password = password;
        }
        userToUpdate.save();
        return res.json(userToUpdate);
    } catch (err) {
        return console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send('Usere dont exist');
        }
        user.remove();
        return res.send('User deleted');
    } catch (err) {
        return console.log(err);
    }
});

module.exports = router;
