var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const auth = require('./app/routes/auth');
const home = require('./app/routes/home');
const tweet = require('./app/routes/tweet');
const comment = require("./app/routes/comment");
const global_user = require('./app/middlewares/global_user');
const { is_user } = require("./app/middlewares/is_authenticated");
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const { link_hashtags, remove_hash_symbol } = require("./app/utils/hashtags_helper");
const format_date = require("./app/utils/format_date");
var app = express();
const db_connection = require('./config/db');
dotenv.config({ path: './config/.env' });
require('./config/passport')(passport);
db_connection();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('.hbs', hbs({
  defaultLayout: 'main_layout', extname: '.hbs',
  helpers: { link_hashtags, format_date, remove_hash_symbol }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "Meo cat",
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', auth);
app.use(is_user, global_user);
app.use('/', home);
app.use('/tweet', tweet);
app.use('/tweet', comment);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render('errors/500');
});

module.exports = app;
