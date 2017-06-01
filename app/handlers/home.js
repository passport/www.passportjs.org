exports = module.exports = function() {
  
  function respond(req, res, next) {
    res.render('index', { title: 'Passport', page_class: 'page-home'});
  }
  
  return [ respond ];
};

exports['@require'] = [];
