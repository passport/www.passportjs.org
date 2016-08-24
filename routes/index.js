var request = require('superagent');
var express = require('express');
var documents = getDocuments();
var router = express.Router();
var repo = null;
var highlight = require('highlight.js');

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Passport', page_class: 'page-home'});
});

router.get('/search', function(req, res, next) {
  res.send('TODO: search - ' + req.query.q)
});

router.get('/docs', function(req, res, next) {
  console.log('GET DOCS');
  console.log(req.headers);
  console.log(req.query)

  res.render('docs', { title: 'Documentation', page_class: 'page-docs'});
});

router.get('/docs/:document', function(req, res, next) {
  console.log('GET DOCS DOCUMENT');
  console.log(req.headers);
  console.log(req.query);
  console.log(req.params)
  
  var opts = {
    gfm: true,
    pedantic: false,
    sanitize: false,
    highlight: function(code, lang) {
      //console.log('*** HIGHLIGHT CODE');
      //return self.highlight(code, lang);
      if (lang) return highlight.highlight(lang, code).value;
      return highlight.highlightAuto(code).value;
    }
  }
  
  return res.render('docs/' + req.params.document + '.md', opts);
  
  var cont = 'menu';
  return res.send('<div id="' + cont + '" data-title="Feat"><p>Hello</p></div>')
  return;
  
  if (!~documents.indexOf(req.params.document)) return next();
  // setup canonical path
  res.locals.context.canonical = '/docs';
  // render docs layout
  res.render('docs', { title: 'Documentation', page_class: 'page-docs'});
});


router.get('/features', function(req, res, next) {
  console.log('GET FEATURES');
  console.log(req.headers);
  console.log(req.query)
  
  //res.send('HELLO')
  
  var cont = req.headers['x-pjax-container'];
  // TODO: Strip # from container
  cont = 'page-content'
  
  // WORKs
  //return res.send('<html><head></head><body><div id="' + cont + '"><p>Hello</p></div></body></html>')
  //return res.send('<div id="' + cont + '" data-title="Feat"><p>Hello</p></div>')
  
  setTimeout(function() {
    res.render('features', { title: 'Features', page_class: 'page-features' });
  }, 1000)
  //res.render('features', { title: 'Features', page_class: 'page-features' });
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
