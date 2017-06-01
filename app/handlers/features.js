exports = module.exports = function() {
  
  function respond(req, res, next) {
    res.render('features', { title: 'Features', page_class: 'page-features'});
  }
  
  return [ respond ];
};

exports['@require'] = [];
