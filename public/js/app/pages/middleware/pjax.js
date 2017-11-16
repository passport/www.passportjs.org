define(['jquery', 'jquery.pjax'], function($, __$_pjax) {
  
  return function(fragment, container) {
    
    return function pjax(ctx, next) {
      $.pjax({ url: ctx.canonicalPath, fragment: fragment, container: container, push: false })
        .done(function(data) {
          next();
        });
    };
  };
  
});
