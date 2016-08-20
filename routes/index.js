var request = require('superagent');
var express = require('express');
var documents = getDocuments();
var router = express.Router();
var repo = null;

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Passport', page_class: 'page-home'});
});

router.get('/search', function(req, res, next) {
  res.send('TODO: search - ' + req.query.q)
});

router.get('/docs', function(req, res, next) {

  res.render('docs', { title: 'Documentation', page_class: 'page-docs'});
});

router.get('/docs/:document', function(req, res, next) {
  if (!~documents.indexOf(req.params.document)) return next();
  // setup canonical path
  res.locals.context.canonical = '/docs';
  // render docs layout
  res.render('docs', { title: 'Documentation', page_class: 'page-docs'});
});


router.get('/features', function(req, res, next) {
  res.render('features', { title: 'Features', page_class: 'page-features'});
});

router.get('/repo.json', function (req, res, next) {
  if (repo) { return res.status(200).json(repo); }
  var url = 'https://api.github.com/repos/jaredhanson/passport';
  request.get(url, function (err, resp) {
    if (err) { return res.status(resp.status).json(resp.body); };
    repo = resp.body;
    res.status(200).json(repo);
    setTimeout(function () { repo = null; }, 24 * 60 * 1000);
  });
});

function getDocuments() {
  var path = require('path');
  var resolve = path.resolve;
  var fs = require('fs');
  var read = fs.readdirSync;

  var documents = read(resolve(__dirname, '../views/docs'));

  return documents.filter(function (d) {
    return /\.md$/.test(d);
  }).map(function (d) {
    return d.replace(/\.md$/, '');
  });
}
