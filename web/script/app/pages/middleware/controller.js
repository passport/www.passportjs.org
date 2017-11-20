define(function() {
  
  return function(ctrlr, shell) {
    
    return function controller(ctx, next) {
      shell.show(ctrlr, ctx.init, function() {
        next();
      });
    };
  };
  
});
