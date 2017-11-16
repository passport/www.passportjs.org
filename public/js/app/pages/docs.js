define(['./middleware/pjax',
        './middleware/nav',
        './middleware/ad/refresh',
        './middleware/handled',
        'highlight', 'jquery'],
function(pjax, nav, adRefresh, handled, hljs, $) {
  
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
    nav('/docs/'),
    adRefresh(),
    function(ctx, next) {
      if (ctx.init || ctx.replacedHTML) {
        hljs.configure({ classPrefix: '' });
        
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      }
      next();
    },
    handled()
  ];
  
});
