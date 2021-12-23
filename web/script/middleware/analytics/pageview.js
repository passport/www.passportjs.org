define(function() {
  
  return function() {
    
    return function pageview(ctx, next) {
      if (ctx.init) { return next(); }
      
      if (!ga) { return next(); }
      
      var path = ctx.canonicalPath;
      
      // https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
      ga('set', 'page', path);
      ga('send', 'pageview');
      
      next();
    };
  };
  
});
