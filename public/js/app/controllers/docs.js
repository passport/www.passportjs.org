define(['highlight', 'jquery', 'jquery.pjax', 'exports'], function(hljs, $, __$_pjax, exports) {
  
  
  exports.basePath = '/docs/';
  
  exports.load = function(cb) {
    $.pjax({ url: '/docs/', fragment: '#page-content', container: '#page-content', push: false })
      .done(function(data) {
        cb();
      });
  }
  
  exports.ready = function() {
    hljs.configure({ classPrefix: '' });
    
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };
  
  exports.unload = function() {}
  
});
