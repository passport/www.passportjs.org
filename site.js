//require('dotenv').load();
//require('bixby')('org.kerouacjs/main', { dev: true });
//return;

require('dotenv').config()

var kerouac = require('kerouac');
var moment = require('moment');


var site = kerouac();
site.engine('pug', require('pug'));

site.set('base url', 'https://www.passportjs.org');
site.set('layout engine', 'pug');
site.locals.pretty = true;

site.use(kerouac.index());

/*
//site.use('/packages', require('kerouac-npm-packages/app/www/site')());
site.use('/packages/-/v1', require('kerouac-npm-packages').api.esc.v1());
// FIXME: Why can't this be mounted below the /packages?
site.use('/packages/-', require('kerouac-npm-packages').api.esc());
//site.use('/packages', require('kerouac-npm-packages').api());
site.use('/packages', require('kerouac-npm-packages')());
site.page('/packages/sitemap.xml', require('kerouac-sitemap')());
*/


var packagesApp = kerouac();
packagesApp.locals.pretty = true;

packagesApp.locals.timeAgo = function(time) {
  return moment(time).fromNow();
}

packagesApp.set('layout engine', 'pug');
packagesApp.use(kerouac.index());
packagesApp.use('/-/v1', require('kerouac-npm-packages').api.esc.v1());
packagesApp.use('/-', require('kerouac-npm-packages').api.esc());
packagesApp.use('/', require('kerouac-npm-packages')());
packagesApp.page('/sitemap.xml', require('kerouac-sitemap')());

site.use('/packages', packagesApp);


//site.use('/docs/howto', kerouac.content('howto'));
site.use('/concepts/authentication', require('kerouac-book')('Documentation', 'docs', { layout: 'book' }));
site.use('/concepts/api-authentication', require('kerouac-book')('API Authentication', 'books/concepts/api-authentication', { layout: 'book' }));
site.use('/concepts/bearer-token', require('kerouac-book')('Documentation', 'books/concepts/bearer-token', { layout: 'book' }));
site.use('/concepts/delegated-authorization', require('kerouac-book')('Delegated Authorization', 'books/concepts/delegated-authorization', { layout: 'book' }));
site.use('/reference/normalized-profile', require('kerouac-book')('Normalized Profile', 'books/reference/normalized-profile', { layout: 'book' }));
site.use('/tutorials/password', require('kerouac-book')('Documentation', 'books/tutorials/password', { layout: 'book' }));
site.use('/tutorials/google', require('kerouac-book')('Documentation', 'books/tutorials/google', { layout: 'book' }))
site.use('/tutorials/auth0', require('kerouac-book')('Documentation', 'books/tutorials/auth0', { layout: 'book' }))
site.content('content');
//site.assets('assets');
//site.use('/howto', kerouac.content('howto'));
//site.use('/blog', require('kerouac-blog')({ layout: 'blog' }));

site.use('/', require('kerouac-manifest')());
site.page('/sitemap.xml', require('kerouac-sitemap')());
site.page('/sitemap-index.xml', require('kerouac-sitemap').index());
site.page('/robots.txt', require('kerouac-robotstxt')());
// TODO: .well-known/security.txt

site.generate([
    kerouac.contentCrawler(),
    [ '/concepts/authentication', require('kerouac-book').browser('docs') ],
    [ '/concepts/api-authentication', require('kerouac-book').browser('books/concepts/api-authentication') ],
    [ '/concepts/delegated-authorization', require('kerouac-book').browser('books/concepts/delegated-authorization') ],
    [ '/concepts/bearer-token', require('kerouac-book').browser('books/concepts/bearer-token') ],
    [ '/reference/normalized-profile', require('kerouac-book').browser('books/reference/normalized-profile') ],
    [ '/tutorials/password', require('kerouac-book').browser('books/tutorials/password') ],
    [ '/tutorials/google', require('kerouac-book').browser('books/tutorials/google') ],
    [ '/tutorials/auth0', require('kerouac-book').browser('books/tutorials/auth0') ],
    //[ '/packages', require('kerouac-npm-packages').browser() ],
    //[ '/packages', require('kerouac-sitemap').browser(), false ],
    [ require('kerouac-sitemap').browser({ index: true }), false ],
    [ require('kerouac-robotstxt').browser(), false ]
  ],
  function(err) {
    console.log('DONE!');
    if (err) {
      console.error(err.message);
      console.error(err.stack);
      return;
    }
  });
