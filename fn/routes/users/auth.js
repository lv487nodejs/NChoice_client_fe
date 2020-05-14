const express = require('express');
const { userLoginValidationRules, validate } = require('../../middleware/validator');
const passport = require('passport')
require('../../config/passport-config')

const passportGoogleIndus = passport.authenticate('googleToken', {session: false})
const passportFacebookIndus = passport.authenticate('facebookToken', {session: false})

const {
    loginUser,
    getToken,
    logout,
    emailConfirmation,
    googleAuth,
    facebookAuth
} = require('../../controllers/users/auth')

const router = express.Router();

// user login
router.post(
    '/login',
    userLoginValidationRules(),
    validate,
    loginUser
);


router.post('/oauth/google', passportGoogleIndus, googleAuth)

router.post('/oauth/facebook', passportFacebookIndus, facebookAuth)

// get token
router.post('/token', getToken);

router.get('/confirmation/:token', emailConfirmation);

// logout
router.delete('/logout', logout);

module.exports = router;
