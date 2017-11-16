define(['jquery', 'jquery.pjax'], function($, __$_pjax) {
  
  return [
    function(ctx, next) {
      ctx.locals = { id: '#' + (ctx.params.slug || 'overview') };
      next();
    },
    function(ctx, next) {
      var referer = window.location.pathname
        , section;
      
      if (referer == '/docs' || referer.indexOf('/docs/') == 0) {
        section = $('.guides ' + ctx.locals.id).first();
        if (section.length) {
          return next();
        }
      }
      
      if (ctx.init) { return next(); }
      $.pjax({ url: ctx.canonicalPath, fragment: '#page-content', container: '#page-content', push: false })
       .done(function(data) {
         next();
       });
    },
  ];
  
});
