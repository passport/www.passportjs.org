define(['highlight'],
function(hljs) {
  
  return function() {
    
    return function highlight(ctx, next) {
      hljs.configure({ classPrefix: '' });
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
      next();
    };
  };
  
});
