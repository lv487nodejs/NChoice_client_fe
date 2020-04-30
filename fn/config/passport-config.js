const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const  LocalStrategy = require('passport-local').Strategy
require('dotenv').config();
const User = require('../models/User');


// passport.use( new JwtStrategy({
//     _jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
//     _secretOrKeyProvider: process.env.ACCESS_TOKEN_SECRET,
//     },
//     async (payload, done) => {
//     try {
//         // find user specified in token
//         const user = await User.findOne({ email: decoded.name })
//         // if user dosent exist - handle it
//         if (!user){
//             return done(null, false)
//         }
//         req.user = user;
//         next();
//         // Otherwise , return the user
//     } catch (error) {
//         done(error, false)
//     }
//     }))

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: '303875330429-u4510uka1kogr1k4lqcgpr1eree7p20r.apps.googleusercontent.com',
        clientSecret: 'aGN94UJdFyRfIt_dp_TTAg2x',
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
    })
);

// Local Strategy

passport.use( new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    try {
        // Find user by email
        const user = await User.findOne( { email })
        // If not handle it
        if (!user) {
            return done(null, false)
        }
        // Check the password
        const comparePassword = await bcrypt.compare(password, user.password);

        // If not handle it
        if (!comparePassword) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))