exports = module.exports = function(docsService, repoHandler, logging) {
  var express = require('express');
  var redirect = require('express-redirect');
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');
  var path = require('path');
  
  
  var service = redirect(express());
  
  service.set('views', path.join(__dirname, '../views'));
  service.set('view engine', 'jade');
  
  service.use(require('stylus').middleware(__dirname + '/../public/stylesheets'));
  
  service.use(logging());
  service.use(bodyParser.json());
  service.use(bodyParser.urlencoded({ extended: false }));
  service.use(cookieParser());
  service.use(express.static(path.join(__dirname, '../public')));
  //service.use(express.static(path.join(__dirname, '../web')));
  
  service.use(function (req, res, next) {
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
  service.redirect('/guide', '/docs', 301);
  service.redirect('/guide/:page', '/docs/:page', 301);
  
  
  //service.use('/docs', docsService);
  service.get('/repo.json', repoHandler);
  
  service.use(express.static(path.join(__dirname, '../www')));
  
  
  // catch 404 and forward to error handler
  service.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if ('development' === service.get('env')) {
    service.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  service.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  
    
  return service;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@require'] = [
  './handlers/docs',
  './handlers/repo',
  'http://i.bixbyjs.org/http/middleware/logging'
];
