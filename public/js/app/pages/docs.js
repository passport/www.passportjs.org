define(['./middleware/pjax', 'jquery'], function(pjax, $) {
  
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
          ctx.pjax = false;
        }
      }
      next();
    },
    pjax('#page-content', '#page-content')
  ];
  
});
