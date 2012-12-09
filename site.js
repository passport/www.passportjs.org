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
    '/guide/log-out.html': '/guide/logout/',
    '/guide/providers.html': '/guide/providers/',
    '/guide/providers/username-password.html': '/guide/providers/username-password/',
    '/guide/providers/oauth.html': '/guide/providers/oauth/',
    '/guide/providers/openid.html': '/guide/providers/openid/',
    '/guide/providers/facebook.html': '/guide/providers/facebook/',
    '/guide/providers/google.html': '/guide/providers/google/',
    '/guide/providers/twitter.html': '/guide/providers/twitter/',
    '/guide/user-profile.html': '/guide/profile/'
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
