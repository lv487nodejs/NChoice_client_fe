const passport = require('passport')
require('dotenv').config();
const User = require('../models/User');
const GooglePlusTokenStrategy = require('passport-google-token').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')
require('dotenv').config();

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

// passport.use(
//     new GoogleStrategy({
//         // options for google strategy
//         clientID: '303875330429-u4510uka1kogr1k4lqcgpr1eree7p20r.apps.googleusercontent.com',
//         clientSecret: 'aGN94UJdFyRfIt_dp_TTAg2x',
//         callbackURL: '/auth/google/redirect'
//     }, (accessToken, refreshToken, profile, done) => {
//         // passport callback function
//         console.log('passport callback function fired:');
//         console.log(profile);
//     })
// );

// Local Strategy

// passport.use( new LocalStrategy({
//     usernameField: 'email'
// }, async(email, password, done) => {
//     try {
//         // Find user by email
//         const user = await User.findOne( { email })
//         // If not handle it
//         if (!user) {
//             return done(null, false)
//         }
//         // Check the password
//         const comparePassword = await bcrypt.compare(password, user.password);
//
//         // If not handle it
//         if (!comparePassword) {
//             return done(null, false);
//         }
//         // Otherwise, return the user
//         done(null, user)
//     } catch (error) {
//         done(error, false)
//     }
// }))


passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '303875330429-u4510uka1kogr1k4lqcgpr1eree7p20r.apps.googleusercontent.com',
    clientSecret: 'aGN94UJdFyRfIt_dp_TTAg2x'
}, async (accessToken, refreshToken, profile, done) =>{
    try{
        console.log(accessToken, 'ACCESSTOKEN')
        // console.log(refreshToken, "REFRESHTOKEN")
        // console.log(profile, "profile")

        // check whether the user exists
        const existingUser = await User.findOne({googleID: profile.id})
        if (existingUser) {
            console.log('USER ALREADY EXISTS')
            console.log(existingUser)
            return done(null, existingUser);
        }

        //If new acc
        console.log('==============creating new user=====================')
        const newUser = new User({
            googleID: profile.id,
            email: profile.emails[0].value
        })
        await newUser.save()
        done(null, newUser)
    }catch (e) {
        console.log('CATCH HERE!!!!!!!!!!!!')
        done(e, false, e.message)
    }
}))

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret:  process.env.FACEBOOK_SECRET
}, async (accessToken, refreshToken, profile, done) =>{
    try{
        console.log(accessToken, 'ACCESSTOKEN')
        console.log(profile, "profile")

        // check whether the user exists
        const existingUser = await User.findOne({email: profile.id})
        if (existingUser) {
            console.log('USER ALREADY EXISTS')
            console.log(existingUser)
            return done(null, existingUser);
        }

        //If new acc
        console.log('==============creating new user=====================')
        console.log(profile.id)

        const newUser = new User({
            email: `${profile.id}`
        })
        console.log(newUser)
        await newUser.save()
        done(null, newUser)
    }catch (e) {
        console.log('CATCH HERE!!!!!!!!!!!!')
        done(e, false, e.message)
    }
}))