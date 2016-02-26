var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

console.log("local storage has just been setup");
//var RedisStore = require('connect-redis')(express);

//This is telling the app that routes is = the index.js file, which is in the routes folder
var routes = require('./routes/index');

/*
 * Requiring the following package to be able to use sessions.
 * Need sessions to be able to store user details
 */
var session = require('express-session');

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
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.session({ store: new RedisStore }));

//Including this to get sessions to work
var expressSessionOptions = {
  secret:'mySecret',
  resave: false,
  saveUninitialized: false
}


app.use(session(expressSessionOptions));

console.log("Sessions have just been setup");

/*app.use(express.session({ store: new RedisStore({
  host:'127.0.0.1',
  port:6380,
  prefix:'sess'
}), secret: 'SEKR37' }));*/

//Anytime i get any kind of a request, use routes, which is the index.js file
app.use('/', routes);

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
