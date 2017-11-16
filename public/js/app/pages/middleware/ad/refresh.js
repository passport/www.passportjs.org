define(['jquery'], function($) {
  
  return function() {
    
    return function adRefresh(ctx, next) {
      if (ctx.init) { return next(); }
      
      // If the ad hasn't loaded yet, don't refresh it while it's still loading, or it will return two (or more) ads
      if (!$("#carbonads")[0]) return;
      // If the script hasn't loaded, don't try calling it
      if (typeof _carbonads !== 'undefined') _carbonads.refresh();
      
      next();
    };
  };
  
});
