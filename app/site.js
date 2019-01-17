exports = module.exports = function(packageRegistry, sitemapProtocol, robotsProtocol) {
  var kerouac = require('kerouac');
  
  
  var site = kerouac();
  site.engine('pug', require('pug'));
  
  site.set('base url', 'http://www.passportjs.org');
  site.set('layout engine', 'pug');
  site.locals.pretty = true;

  //site.use('/packages', packageRegistry);

  site.content('content');
  site.use('/docs', require('kerouac-book')('Documentation', 'docs', { layout: 'book' }));

  site.use('/', require('kerouac-manifest')());
  site.use(sitemapProtocol);
  site.use(robotsProtocol);
  
  return site;
};

exports['@require'] = [
  'io.modulate/comp/lang/javascript/packages/registry/www/site',
  'org.kerouacjs/sitemap/protocol',
  'org.kerouacjs/robots/protocol'
];
