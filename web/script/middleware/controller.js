define(['../shell'], function(shell) {
  
  return function(ctrlr, modal) {
    var show = modal ? shell.present : shell.show;
    
    return function controller(ctx, next) {
      shell.menu.close();
      show(ctrlr, ctx, function() {
        ctrlr.dispatch(ctx, next);
      });
    };
  };
  
});
