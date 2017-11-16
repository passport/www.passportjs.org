define(['../../shell'], function(shell) {
  
  return function(url, loaded) {
    
    return function browse(ctx, next) {
      if (ctx.init) { return next(); }
      shell.browse(url, loaded);
      next();
    };
  };
  
});
