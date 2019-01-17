exports = module.exports = function(packages, sitemap, robots) {
  var kerouac = require('kerouac');
  
  
  var site = kerouac();
  site.engine('pug', require('pug'));
  
  site.set('base url', 'http://www.passportjs.org');
  site.set('layout engine', 'pug');
  site.locals.pretty = true;

  //site.use('/packages', packages);

  site.content('content');
  site.use('/docs', require('kerouac-book')('Documentation', 'docs', { layout: 'book' }));

  site.use('/', require('kerouac-manifest')());
  site.use(sitemap);
  site.use(robots);
  
  return site;
};

exports['@require'] = [
  'http://schemas.modulate.io/js/comp/lang/javascript/packages/registry/WWWSite',
  'org.kerouacjs/sitemap/protocol',
  'org.kerouacjs/robots/protocol'
];
