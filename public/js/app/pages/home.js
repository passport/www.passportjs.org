define(['jquery', 'jquery.pjax'], function($, __$_pjax) {
  
  return [
    function(ctx, next) {
      if (ctx.init) { return; }
      
      $.pjax({ url: ctx.canonicalPath, fragment: '#page-content', container: '#page-content', push: false })
        .done(function(data) {
          next();
        });
    }
  ];
  
});
