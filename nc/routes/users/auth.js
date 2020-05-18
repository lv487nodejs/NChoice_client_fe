const express = require('express');
const { userLoginValidationRules, validate } = require('../../middleware/validator');

const {
    loginUser,
    loginAdmin,
    getToken,
    logout,
    emailConfirmation,
} = require('../../controllers/users/auth')

const router = express.Router();

// user login
router.post('/login', userLoginValidationRules(), validate, loginUser);

router.post('/admin/login', loginAdmin);

// get token
router.post('/token', getToken);

router.get('/confirmation/:token', emailConfirmation);

// logout
router.delete('/logout', logout);

module.exports = router;
