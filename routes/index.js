var express = require('express');
var router = express.Router();

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

module.exports = router;
