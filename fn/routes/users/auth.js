const express = require('express');
const { userLoginValidationRules, validate } = require('../../middleware/validator');
const passport = require('passport')
const passportConfig = require('../../config/passport-config')

const {
    loginUser,
    getToken,
    logout,
    emailConfirmation,
    googleAuth,
    googleRedirect
} = require('../../controllers/users/auth')

const router = express.Router();

// user login
router.post(
    '/login',
    userLoginValidationRules(),
    validate,
    passport.authenticate('local', {session: false}, loginUser)
);

//google login
router.get('google/login', googleAuth);

router.get('/google/redirect', googleRedirect)

// get token
router.post(
    '/token',
    passport.authenticate('jwt', {session: false}, getToken)
);

router.get('/confirmation/:token', emailConfirmation);

// logout
router.delete('/logout', logout);

module.exports = router;
