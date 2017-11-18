define(['./middleware/ad/refresh',
        './middleware/handled',
        '../controllers/home',
        '../shell'],
function(adRefresh, handled, controller, shell) {
  
  return [
    function(ctx, next) {
      shell.show(controller, ctx.init, function() {
        next();
      });
    },
    adRefresh(),
    handled()
  ];
  
});
