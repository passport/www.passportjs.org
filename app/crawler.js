exports = module.exports = function(npm, crawler, repo, logger) {
  var packageJson = require('package-json');
  
  
  
  logger.info('starting crawl...');
  
  crawler.use(require('aranea').middleware.jsonParser());
  
  crawler.process('application/json', npm);
  
  
  //crawler.add('https://www.npmjs.com/search?q=passport')
  crawler.add('https://registry.npmjs.org/passport-twitter');
  crawler.start();
  
  
  return;
  
  packageJson('passport-twitter', { allVersions: true, fullMetadata: false })
    .then(function(data) {
  	  console.log(data);
  	  //=> {name: 'ava', ...}
      
      var pkg;
      
      if (!data['dist-tags']['latest']) {
        throw Error('oh no, no latest version')
      }
      
      //pkg = data.versions[data['dist-tags']['latest']];
      //console.log(pkg)
      
      var obj = {
        name: data.name
      }
      
      repo.create(obj, function(err, rec) {
        console.log(err);
        console.log(rec);
      })
      
    });
  
  
};

exports['@singleton'] = true;
exports['@require'] = [
  './www/crawler/npm',
  'http://schemas.modulate.io/js/www/crawler/Crawler',
  'http://schemas.modulate.io/js/data/software/SoftwareRepository',
  'http://i.bixbyjs.org/Logger'
];
