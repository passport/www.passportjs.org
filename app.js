var cookieParser = require('cookie-parser');
var redirect = require('express-redirect');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var routes = require('./routes/index');
var express = require('express');
var logger = require('morgan');
var stylus = require('stylus');
var path = require('path');


var app = module.exports = redirect(express());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.engine('md', require('marked-engine').renderFile);

app.use(require('stylus').middleware(__dirname + '/public/stylesheets'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static('www'));

// locals
app.use(function (req, res, next) {
  // default locals that can be overriden in routes
  res.locals = res.locals || {};
  res.locals.context = res.locals.context || {};
  res.locals.context.env = process.env.NODE_ENV;
  res.locals.context.protocol = req.protocol;
  res.locals.context.path = req.path;
  res.locals.context.url = req.url;
  res.locals.context.hostname = req.hostname;
  res.locals.context.canonical = req.path;
  next();
});

// setup redirects
app.redirect('/guide', '/docs', 301);
app.redirect('/guide/:page', '/docs/:page', 301);

// mount routes
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
if ('development' === app.get('env')) {
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

if ('development' === app.get('env')) {
  require('express-livereload')(app, {})
}
