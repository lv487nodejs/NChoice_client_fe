const passport = require('passport')
require('dotenv').config();
const User = require('../models/User');
const GooglePlusTokenStrategy = require('passport-google-token').Strategy
const FacebookTokenStrategy = require('passport-facebook-token')
require('dotenv').config();


passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: '303875330429-u4510uka1kogr1k4lqcgpr1eree7p20r.apps.googleusercontent.com',
    clientSecret: 'aGN94UJdFyRfIt_dp_TTAg2x'
}, async (accessToken, refreshToken, profile, done) =>{
    try{
        // check whether the user exists
        const existingUser = await User.findOne({email: profile.emails[0].value})
        if (existingUser) {
            return done(null, existingUser);
        }

        //If new acc

        const newUser = new User({
            password: profile.id,
            email: profile.emails[0].value,
            confirmedEmail: true,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName

        })
        await newUser.save()
        done(null, newUser)
    }catch (e) {
        done(e, false, e.message)
    }
}))

passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret:  process.env.FACEBOOK_SECRET
}, async (accessToken, refreshToken, profile, done) =>{
    try {
            const searchBy = profile.emails[0].value || profile.id
            const existingUser = await User.findOne({email: searchBy})
            if (existingUser) {
                return done(null, existingUser);
            }

        //If new acc
        const newUser = new User({
            email: `${ searchBy }`,
            confirmedEmail: true,
            password: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        })
        await newUser.save()
        done(null, newUser)
    } catch (e) {
        done(e, false, e.message)
    }
}))