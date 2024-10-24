require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
var passport = require('passport');
require('./config/passport')(passport); 
var db = require("./models");

var usersRouter = require('./routes/users');
var homePageRouter = require('./routes/homePage');
var profileRouter = require('./routes/profile');
var searchRouter = require('./routes/search');
var loginRouter = require('./routes/login');
var infoRouter = require('./routes/infoPage');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'some_secret',
  store: new SQLiteStore(), 
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 3600000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// syncing database
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced with models.");
}).catch((error) => {
  console.error("Failed to sync database with models:", error);
});

app.use('/', homePageRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/search', searchRouter);
app.use('/login', loginRouter);
app.get('/register', (req, res) => {
  res.render('register');
});
app.use('/infoPage', infoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;