var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategt = require('passport-facebook').Strategy;
var serveStatic = require('serve-static');
var cors = require('cors');
var User = require('./models/user');
var consts = require('./consts');

var mongoDB = consts.MONGO_URI;
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// enable debug
mongoose.set('debug', true);

var index = require('./routes/index');
var users = require('./routes/users');
var emotion = require('./routes/emotion');
var entries = require('./routes/entries');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// about user authentication
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// serve static files
app.use(serveStatic(path.join(__dirname, 'public')));
// serve media files
app.use(serveStatic(path.join(__dirname, 'media')));

var corsOptions = {
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods:['GET','POST', 'OPTIONS'],
  credentials: true // enable set cookie
}

app.use(cors(corsOptions));

app.use('/', index);
app.use('/users', users);
app.use('/emotion', emotion);
app.use('/entries', entries);

// passport config
passport.use(User.createStrategy());
// passport.use(new FacebookStrategt({
//     clientID: consts.FACEBOOK_APP_ID,
//     clientSecret: consts.FACEBOOK_APP_SECRET,
//     callbackURL: consts.BASE_URL + "/users/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
