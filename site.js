//require('dotenv').load();
//require('bixby')('org.kerouacjs/main', { dev: true });
//return;

require('dotenv').config()

var kerouac = require('kerouac');
var book = require('kerouac-book');
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
site.use('/concepts/authentication', book('docs'));
site.use('/concepts/api-authentication', book('books/concepts/api-authentication'));
site.use('/concepts/bearer-token', book('books/concepts/bearer-token'));
site.use('/concepts/delegated-authorization', book('books/concepts/delegated-authorization'));
site.use('/reference/normalized-profile', book('books/reference/normalized-profile'));
site.use('/tutorials/password', book('books/tutorials/password'));
site.use('/tutorials/google', book('books/tutorials/google'))
site.use('/tutorials/email', book('books/tutorials/email'))
site.use('/tutorials/auth0', book('books/tutorials/auth0'))
site.use(kerouac.content('content'));
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
    [ '/concepts/authentication', book.createMapper('docs') ],
    [ '/concepts/api-authentication', book.createMapper('books/concepts/api-authentication') ],
    [ '/concepts/delegated-authorization', book.createMapper('books/concepts/delegated-authorization') ],
    [ '/concepts/bearer-token', book.createMapper('books/concepts/bearer-token') ],
    [ '/reference/normalized-profile', book.createMapper('books/reference/normalized-profile') ],
    [ '/tutorials/password', book.createMapper('books/tutorials/password') ],
    [ '/tutorials/google', book.createMapper('books/tutorials/google') ],
    [ '/tutorials/email', book.createMapper('books/tutorials/email') ],
    [ '/tutorials/auth0', book.createMapper('books/tutorials/auth0') ],
    [ '/packages', require('kerouac-npm-packages').createMapper() ],
    //[ '/packages', require('kerouac-sitemap').browser(), false ],
    [ require('kerouac-sitemap').createMapper({ index: true }), false ],
    [ require('kerouac-robotstxt').createMapper(), false ]
  ],
  function(err) {
    console.log('DONE!');
    if (err) {
      console.error(err.message);
      console.error(err.stack);
      return;
    }
  });
