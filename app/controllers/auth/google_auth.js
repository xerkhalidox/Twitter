const passport = require('passport');


const google_auth = passport.authenticate('google', {
    scope: ['profile']
});

const google_auth_callback = passport.authenticate(
    'google',
    { failureRedirect: '/login' }
);

const auth_handler = (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
};

module.exports = { google_auth, google_auth_callback, auth_handler };
