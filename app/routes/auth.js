const express = require('express');
const router = express.Router();
const passport = require('passport');
const { google_auth, google_auth_callback, auth_handler } =
    require('../controllers/auth/google_auth');
const login = require('../controllers/auth/login');
const logout = require('../controllers/auth/logout');

const { is_guest, is_user } = require('../middlewares/is_authenticated');

router.get('/login', is_guest, login);
router.get('/auth/google', is_guest, google_auth);
router.get('/auth/google/callback', is_guest, google_auth_callback, auth_handler);
router.get('/auth/logout', is_user, logout);
module.exports = router;
