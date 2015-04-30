var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PassportJS' });
});

router.get('/docs', function(req, res, next) {
  res.render('docs', { title: 'PassportJS - Documentation' });
});

module.exports = router;
