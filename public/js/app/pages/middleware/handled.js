define(function() {
  
  return function() {
    
    return function handled(ctx, next) {
      ctx.handled = true;
      next();
    };
  };
  
});
