//require('dotenv').load();
//require('bixby')('org.kerouacjs/main', { dev: true });
//return;

require('dotenv').config()

var kerouac = require('kerouac');
var moment = require('moment');


var site = kerouac();
site.engine('pug', require('pug'));

site.locals.timeAgo = function(time) {
  return moment(time).fromNow();
}

site.set('base url', 'http://www.passportjs.org');
site.set('layout engine', 'pug');
site.locals.pretty = true;

//site.use('/packages', require('kerouac-npm-packages/app/www/site')());

/*
site.use('/packages/-/v1', require('kerouac-npm-packages').api.v1());
// FIXME: Why can't this be mounted below the /packages?
site.use('/packages/-', require('kerouac-npm-packages').api());
site.use('/packages', require('kerouac-npm-packages')());
*/

//site.use('/docs/howto', kerouac.content('howto'));
site.use('/docs', require('kerouac-book')('Documentation', 'docs', { layout: 'book' }));
site.content('content');
//site.assets('assets');
//site.use('/howto', kerouac.content('howto'));
//site.use('/blog', require('kerouac-blog')({ layout: 'blog' }));

site.use('/', require('kerouac-manifest')());
//site.page('/sitemap.xml', require('kerouac-sitemap')());
//site.page('/sitemap-index.xml', require('kerouac-sitemap').index());
//site.page('/robots.txt', require('kerouac-robotstxt')());
// TODO: .well-known/security.txt

site.generate(function(err) {
  console.log('DONE!');
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return;
  }
});
