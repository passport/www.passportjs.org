var kerouac = require('kerouac');
var site = kerouac();

site.set('base url', 'http://www.passportjs.org');
site.set('layout engine', 'pug');

site.locals.pretty = true;

//site.engine('jade', require('jade'));
site.engine('pug', require('pug'));

//site.use('/packages', require('kerouac-npm-packages')());
site.content('content');
site.content('views', { layout: 'docs' });

site.generate(function(err) {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return;
  }
});
