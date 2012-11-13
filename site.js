var kerouac = require('kerouac');
var site = kerouac();

site.set('base url', 'http://passportjs.org/');
site.set('output', 'passportjs.org');

site.engine('ejs', require('ejs-locals'));

site.content('content');
site.static('public');

site.plug(require('kerouac-sitemap')());
site.plug(require('kerouac-robotstxt')());


/**
 * .htaccess
 */
;(function() {
  var redirect = {
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
    '/guide/username-password.html': '/guide/username-password/'
  }
  
  site.plug(require('kerouac-htaccess')({ redirect: redirect }));
})();


site.generate(function(err) {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return;
  }
});
