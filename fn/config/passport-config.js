const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
