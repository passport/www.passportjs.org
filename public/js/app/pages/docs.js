define(['./middleware/pjax', 'highlight', 'jquery'], function(pjax, hljs, $) {
  
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
    pjax('#page-content', '#page-content'),
    function(ctx, next) {
      if (ctx.replacedHTML) {
        console.log('REPLACED HTML!');
        
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      }
      next();
    },
    function(ctx, next) {
      ctx.handled = true;
      next();
    }
  ];
  
});
