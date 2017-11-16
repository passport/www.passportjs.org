define(['../shell', 'highlight', 'jquery', 'jquery.pjax', 'exports'], function(shell, hljs, $, __$_pjax, exports) {
  
  exports.basePath = '/docs/';
  
  exports.load = function(cb) {
    $.pjax({ url: '/docs/', fragment: '#page-content', container: '#page-content', push: false })
      .done(function(data) {
        cb();
      });
  }
  
  exports.scrollTo = function(id) {
    if (!id) { return; }
    shell.scrollToElementById(id);
  }
  
  exports.ready = function() {
    hljs.configure({ classPrefix: '' });
    
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };
  
  exports.unload = function() {}
  
});
