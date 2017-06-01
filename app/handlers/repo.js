exports = module.exports = function() {
  var request = require('superagent');
  
  
  var repo = null;
  
  function respond(req, res, next) {
    if (repo) { return res.status(200).json(repo); }
    var url = 'https://api.github.com/repos/jaredhanson/passport';
    request.get(url, function (err, resp) {
      if (err) { return res.status(resp.status).json(resp.body); };
      repo = resp.body;
      res.status(200).json(repo);
      setTimeout(function () { repo = null; }, 24 * 60 * 1000);
    });
  }
  
  return [ respond ];
};

exports['@require'] = [];
