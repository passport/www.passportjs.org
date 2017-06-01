exports = module.exports = function() {
  
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
  
  
  
  function respond(req, res, next) {
    if (req.params.document) {
      if (!~documents.indexOf(req.params.document)) return next();
      res.locals.context.canonical = '/docs';
    }
    
    res.render('docs', { title: 'Documentation', page_class: 'page-docs'});
  }
  
  return [ respond ];
};

exports['@require'] = [];
