exports = module.exports = function(showHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/:slug?', showHandler);
  
  return router;
};

exports['@require'] = [
  './docs/show'
];
