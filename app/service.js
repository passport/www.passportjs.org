exports = module.exports = function(homeHandler, docsService, featuresHandler, repoHandler) {
  var express = require('express');
  var path = require('path');
  
  
  var service = express();
  
  service.set('views', path.join(__dirname, '../views'));
  service.set('view engine', 'jade');
  
  service.use(require('morgan')('common'));
  service.use(express.static(path.join(__dirname, '../public')));
  
  service.use(function (req, res, next) {
    // default locals that can be overriden in routes
    res.locals = res.locals || {};
    res.locals.context = res.locals.context || {};
    res.locals.context.env = process.env.NODE_ENV;
    res.locals.context.protocol = req.protocol;
    res.locals.context.path = req.path;
    res.locals.context.url = req.url;
    res.locals.context.hostname = req.hostname;
    res.locals.context.canonical = req.path;
    next();
  });
  
  
  service.get('/', homeHandler);
  service.use('/docs', docsService);
  service.get('/features', featuresHandler);
  service.get('/repo.json', repoHandler)
    
  return service;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Service';
exports['@require'] = [
  './handlers/home',
  './handlers/docs',
  './handlers/features',
  './handlers/repo'
];
