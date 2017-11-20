define(function() {
  
  return function(ctrlr, shell, modal) {
    var show = modal ? shell.present : shell.show;
    
    return function controller(ctx, next) {
      shell.menu.close();
      show(ctrlr, ctx.init, function() {
        ctrlr.dispatch(ctx, next);
      });
    };
  };
  
});
