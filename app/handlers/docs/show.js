exports = module.exports = function() {
  var path = require('path')
    , fs = require('fs');

  
  function getDocuments() {
    var path = require('path');
    var resolve = path.resolve;
    var fs = require('fs');
    var read = fs.readdirSync;

    var documents = read(resolve(__dirname, '../../../views/docs'));

    return documents.filter(function (d) {
      return /\.md$/.test(d);
    }).map(function (d) {
      return d.replace(/\.md$/, '');
    });
  }
  
  var documents = getDocuments();
  
  
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
  
  
  function respond_old(req, res, next) {
    if (req.params.document) {
      if (!~documents.indexOf(req.params.document)) return next();
      res.locals.context.canonical = '/docs';
    }
    
    res.render('docs', { title: 'Documentation', page_class: 'page-docs'});
  }
  
  return [ respond ];
};

exports['@require'] = [];
