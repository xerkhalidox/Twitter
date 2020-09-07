const googleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../app/models/user');

const User = ({ id, displayName, photos }) => {
    return user = {
        google_id: id,
        name: displayName,
        img: photos[0].value
    };
};

module.exports = (passport) => {
    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        const newUser = User(profile);
        try {
            let user = await userModel.findOne({ google_id: profile.id });
            if (user) {
                done(null, user);
            } else {
                user = await userModel.create(newUser);
                done(null, user);
            }
        } catch (err) {
            console.error(err);
        }
    }));
    passport.serializeUser((user, done) =>
        done(null, user.id)
    );
    passport.deserializeUser((id, done) => {
        userModel.findById(id, (err, user) =>
            done(err, user)
        );
    });
};