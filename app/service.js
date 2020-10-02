exports = module.exports = function(repoHandler, logging) {
  var express = require('express');
  var redirect = require('express-simple-redirect');
  var path = require('path');
  
  
  var service = express();
  
  service.set('views', path.join(__dirname, '../layouts'));
  service.set('view engine', 'pug');
  service.locals.pretty = true;
  
  service.use(logging());
  service.use(express.static(path.join(__dirname, '../public')));
  //service.use(express.static(path.join(__dirname, '../web')));
  
  service.use(redirect({
    // The following set of redirects were defined in the initial commit to this
    // site's repository.  The redirect URLs matching the template `/guide/{document}.html`
    // to `/guide/{document}/`, forming a pretty URL by dropping the `.html`
    // extension.
    //
    // I cannot remember the implementation details prior to this initial commit
    // which would have resulted in a site being generated with URLs matching
    // this template.
    //
    // For reference, refer to the source tree at #5f738fe:
    //   https://github.com/passport/www.passportjs.org/tree/5f738fe
    '/guide/authenticate.html': '/guide/authenticate/',
    '/guide/authorize.html': '/guide/authorize/',
    '/guide/configuration.html': '/guide/configure/',
    '/guide/facebook.html': '/guide/facebook/',
    '/guide/google.html': '/guide/google/',
    '/guide/log-out.html': '/guide/logout/',
    '/guide/oauth-providers.html': '/guide/providers/',
    '/guide/oauth.html': '/guide/oauth/',
    '/guide/openid-providers.html': '/guide/providers/',
    '/guide/openid.html': '/guide/openid/',
    '/guide/twitter.html': '/guide/twitter/',
    '/guide/user-profile.html': '/guide/profile/',
    '/guide/username-password.html': '/guide/username-password/',

    // The following set of redirects were defined when the site was redesigned
    // by Auth0 in May 2015.  During the redesign, documentation pages were
    // moved from `/guide` to `/docs`.
    //
    // The final commit to the original design was #72eb4e4:
    //   https://github.com/passport/www.passportjs.org/tree/72eb4e4
    // The redesign was first published at commit #aa81d6a:
    //   https://github.com/passport/www.passportjs.org/tree/aa81d6a
    '/guide/': '/docs/',
    '/guide/authenticate/': '/docs/authenticate/',
    '/guide/authorize/': '/docs/authorize/',
    '/guide/configure/': '/docs/configure/',
    '/guide/facebook/': '/docs/facebook/',
    '/guide/google/': '/docs/google/',
    '/guide/login/': '/docs/logout/',
    '/guide/logout/': '/docs/logout/',
    '/guide/oauth/': '/docs/oauth/',
    '/guide/openid/': '/docs/openid/',
    '/guide/profile/': '/docs/profile/',
    '/guide/providers/': '/docs/providers/',
    '/guide/twitter/': '/docs/twitter/',
    '/guide/username-password/': '/docs/username-password/',
    
    // The following set of redirects are a workaround for an overly-permissive
    // redirect rule introduced during the redesign by Auth0 in May 2015.
    // When the redesign was launched, the service removed the `/guide/{document}.html`
    // -> `/guide/{document}/` redirects above and replaced them with a single
    // rule `/guide/{:document}` -- 301 --> `/docs/{:document}`.  Due to the
    // permanent redirect various caches and indexes have references to URLs
    // matching the template `/docs/{document}.html`, using the original URLs
    // containing the `.html` extension, but under the new `/docs` path.
    '/docs/authenticate.html': '/docs/authenticate/',
    '/docs/authorize.html': '/docs/authorize/',
    '/docs/configuration.html': '/docs/configure/',
    '/docs/facebook.html': '/docs/facebook/',
    '/docs/google.html': '/docs/google/',
    '/docs/log-out.html': '/docs/logout/',
    '/docs/oauth-providers.html': '/docs/providers/',
    '/docs/oauth.html': '/docs/oauth/',
    '/docs/openid-providers.html': '/docs/providers/',
    '/docs/openid.html': '/docs/openid/',
    '/docs/twitter.html': '/docs/twitter/',
    '/docs/user-profile.html': '/docs/profile/',
    '/docs/username-password.html': '/docs/username-password/',
  }, 301));
  
  
  service.get('/repo.json', repoHandler);
  
  service.use(express.static(path.join(__dirname, '../www')));
  
  
  service.use(require('../lib/middleware/loadmanifest')(path.join(__dirname, '../manifest.yaml')));
  
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
