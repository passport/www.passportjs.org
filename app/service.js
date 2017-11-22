exports = module.exports = function(repoHandler, logging) {
  var express = require('express');
  var redirect = require('express-simple-redirect');
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');
  var path = require('path');
  
  
  var service = express();
  
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
  //service.redirect('/guide', '/docs', 301);
  //service.redirect('/guide/:page', '/docs/:page', 301);
  
  service.use(redirect({
    // TODO: Describe this ste.
    '/guide/authenticate.html': '/docs/authenticate/',
    '/guide/authorize.html': '/docs/authorize/',
    '/guide/configuration.html': '/docs/configure/',
    '/guide/facebook.html': '/docs/facebook/',
    '/guide/google.html': '/docs/google/',
    '/guide/log-out.html': '/docs/logout/',
    '/guide/oauth-providers.html': '/docs/providers/',
    '/guide/oauth.html': '/docs/oauth/',
    '/guide/openid-providers.html': '/docs/providers/',
    '/guide/openid.html': '/docs/openid/',
    '/guide/twitter.html': '/docs/twitter/',
    '/guide/user-profile.html': '/docs/profile/',
    '/guide/username-password.html': '/docs/username-password/',
    // TODO: Describe this set.
    '/guide/authenticate/': '/docs/authenticate/',
    '/guide/authorize/': '/docs/authorize/',
    '/guide/configuration/': '/docs/configure/',
    '/guide/facebook/': '/docs/facebook/',
    '/guide/google/': '/docs/google/',
    '/guide/log-out/': '/docs/logout/',
    '/guide/oauth-providers/': '/docs/providers/',
    '/guide/oauth/': '/docs/oauth/',
    '/guide/openid-providers/': '/docs/providers/',
    '/guide/openid/': '/docs/openid/',
    '/guide/twitter/': '/docs/twitter/',
    '/guide/user-profile/': '/docs/profile/',
    '/guide/username-password/': '/docs/username-password/'
  }, 301));
  
  
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
  './handlers/repo',
  'http://i.bixbyjs.org/http/middleware/logging'
];
