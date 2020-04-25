const express = require('express');
const { userValidationRules, validate } = require('../../middleware/validator');
const { auth, authorize } = require('../../middleware/auth');

const {
    updateUser,
    updateUserRole,
    registerUser,
    getUser,
    getUsers,
} = require('../../controllers/users/users');

const router = express.Router();

// get all users
router.get('/', auth, authorize('admin'), getUsers);

// get user by id
router.get('/:id', auth, authorize('admin', 'user'), getUser);

// update user
router.put('/:id', auth, authorize('user'), updateUser);

// update user role
router.put('/role/:id', auth, authorize('admin'), updateUserRole);

// register user
router.post('/register', userValidationRules(), validate, registerUser);

module.exports = router;
