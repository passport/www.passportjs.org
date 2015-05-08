var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PassportJS - Home' });
});

router.get('/docs', function(req, res, next) {
  res.render('docs', { title: 'PassportJS - Documentation' });
});

router.get('/features', function(req, res, next) {
  res.render('features', { title: 'PassportJS - Features' });
});

module.exports = router;
