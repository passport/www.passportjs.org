define(['../shell', 'jquery', 'exports'], function(shell, $, exports) {
  
  exports.basePath = '/packages/';
  
  exports.load = function(cb) {
    console.log('LOAD PACKAGES!');
  }
  
  exports.ready = function() {
    console.log('READY...');
  };
  
  exports.unload = function() {
    
  };
  
});
