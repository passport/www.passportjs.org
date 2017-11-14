exports = module.exports = function() {
  var path = require('path')
    , fs = require('fs');
  
  
  var baseDir = '../../../www/docs';
  
  function respond(req, res, next) {
    var slug = req.params.slug
      , file;
    
    if (slug) {
      file = path.resolve(__dirname, baseDir, slug, 'index.html');
      if (!fs.existsSync(file)) { return next(); }
    }
    
    file = path.resolve(__dirname, '../../../www/docs/downloads/html/index.html');
    return res.sendFile(file);
  }
  
  return [ respond ];
};

exports['@require'] = [];
