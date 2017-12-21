var fs = require('fs')
  , YAML = require('js-yaml');


exports = module.exports = function(file) {
  file = file || 'manifest.yaml';
  
  var text = fs.readFileSync(file, 'utf8');
  var manifest = YAML.safeLoad(text);
  
  
  return function(req, res, next) {
    res.locals.manifest = manifest;
    next();
  };
};
