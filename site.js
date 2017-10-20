var kerouac = require('kerouac');
var site = kerouac();

site.set('base url', 'http://www.passportjs.org');
site.set('layout engine', 'jade');

site.content('content');
site.content('views', { layout: 'docs' });

site.generate(function(err) {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return;
  }
});
