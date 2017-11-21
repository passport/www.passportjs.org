define(['jquery'], function($) {
  
  var _lastRefresh;
  
  return function(persist) {
    persist = persist || 60000; // 60 seconds
    
    return function adRefresh(ctx, next) {
      var now = new Date().getTime();
      if (ctx.init) {
        _lastRefresh = now;
        return next();
      }
      
      
      if (now - _lastRefresh < persist) {
        return next();
      }
      
      // If the ad hasn't loaded yet, don't refresh it while it's still loading, or it will return two (or more) ads
      if (!$("#carbonads")[0]) return;
      // If the script hasn't loaded, don't try calling it
      if (typeof _carbonads !== 'undefined') _carbonads.refresh();
      
      _lastRefresh = now;
      next();
    };
  };
  
});
