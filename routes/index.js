var request = require('superagent');
var express = require('express');
var router = express.Router();
var repo = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Passport', page_class: 'page-home'});
});

router.get('/docs', function(req, res, next) {
  res.render('docs', { title: 'Documentation', page_class: 'page-docs'});
});

router.get('/features', function(req, res, next) {
  res.render('features', { title: 'Features', page_class: 'page-features'});
});

router.get('/repo.json', function (req, res, next) {
  if (repo) { return res.json(200, repo); }
  var url = 'https://api.github.com/repos/jaredhanson/passport';
  request.get(url, function (err, resp) {
    if (err) { return res.json(resp.status, resp.body); };
    repo = resp.body;
    res.json(200, repo);
    setTimeout(function () { repo = null; }, 24 * 60 * 1000);
  });
});

module.exports = router;
