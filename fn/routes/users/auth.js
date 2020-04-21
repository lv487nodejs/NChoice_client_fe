const express = require('express');
const { userLoginValidationRules, validate } = require('../../middleware/validator');

const {
    loginUser,
    loginAdmin,
    getToken,
    logout,
} = require('../../controllers/users/auth')

const router = express.Router();

// user login
router.post('/login', userLoginValidationRules(), validate, loginUser);

//google login
router.get('google/login', userLoginValidationRules(), validate, googleAuth);

router.get('/google/redirect', googleRedirect)

// admin login
router.post('/admin/login', userLoginValidationRules(), validate, loginAdmin);

// get token
router.post('/token', getToken);

// logout
router.delete('/logout', logout);

module.exports = router;
