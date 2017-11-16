define(['../../shell/menu'], function(menu) {
  
  return function(url) {
    
    return function nav(ctx, next) {
      if (ctx.init) { return next(); }
      menu.active(url);
      next();
    };
  };
  
});
