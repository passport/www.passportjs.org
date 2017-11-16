define(['../../shell'], function(shell) {
  
  return function(url) {
    
    return function nav(ctx, next) {
      if (ctx.init) { return next(); }
      shell.browse(url);
      next();
    };
  };
  
});
