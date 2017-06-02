exports = module.exports = function(repo) {
  
  
  function loadPackage(req, res, next) {
    repo.query(req.params.slug, function(err, pkgs) {
      if (err) { return next(err); }
      
      if (!pkgs || pkgs.length == 0) {
        return res.send('Not found')
      }
      if (pkgs.length > 1) {
        return res.send('Too many')
      }
      
      res.locals.package = pkgs[0];
      next();
    })
  }
  
  function respond(req, res, next) {
    var pkg = res.locals.package;
    var body = {
      name: pkg.name
    };
    
    res.json(body);
  }
  
  
  return [
    loadPackage,
    respond
  ];
};

exports['@require'] = [
  'http://schemas.modulate.io/js/data/software/SoftwareRepository'
];
