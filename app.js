var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var assert = require('assert');
var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var config = require('./public/javascripts/database');
var User = require('./public/javascripts/register');

var routes = require('./routes/index');
var users = require('./routes/users');
var game = require('./routes/game');
var register = require('./routes/register');
var login = require('./routes/login');
var register = require('./routes/register')
var register = require('./routes/register')
var register = require('./routes/register')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', routes);
app.use('/users', users);
app.use('/game', game);
app.use('/register', register);
app.use('/login', login);
app.post('/register', function (req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({succes: false, msg: 'Please enter name and password'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      exp: 0
    });
    newUser.save(function (err) {
      if (err) {
        res.json({succes: false, msg: 'Username aleady exist'});
      }
      else {
        res.json({succes: true, msg: 'Successful created user'});
      }
    });
    }
  });

  app.post('/login', function (req, res) {
    User.findOne({
      name: req.body.name
    }, function (err, user) {
      if (err) throw err;
      if (!user) {
        return res.status(403).send({success: false, msg: "Authentication failed, User not found"});
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.encode(user, config.secret);
            res.json({succes: true, token: 'JWT ' + token});
        } else {
          return res.status(403).send({success: false, msg: "Authentication failed, Wrong password"});
        }
      });
      }
    });
  });

  app.get('/users', passport.authenticate('jwt', {session: false}), function (req, res) {
    var token = getToken(req.headers);

    if (token) {
      var decoded = jwt.decode(token, config.secret);
      User.findOne({
        name: decoded.name
      }, function (err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({ success: false, msg: "Authentication failed, User not found"});
        } else {
          return res.json({success: true, msg: 'Welcome to your profile ' + user.name + '!'});
          }
      });
    }
    else {
      return res.status(403).send({success: false, msg: "No token provided"});
    }
  });

  getToken = function(headers) {
    if (headers && headers.authorization) {
      var parted =  headers.authorization.split(' ');
      if (parted.lenght ===2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

mongoose.connect(config.database);
require('./public/javascripts/passport')(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
