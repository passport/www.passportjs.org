define(['./middleware/ad/refresh',
        './middleware/handled',
        '../controllers/docs',
        '../shell'],
function(adRefresh, handled, controller, shell) {
  
  return [
    function(ctx, next) {
      shell.show(controller, ctx.init, function() {
        next();
      });
    },
    function(ctx, next) {
      controller.scrollTo(ctx.params.slug);
      next();
    },
    adRefresh(),
    handled()
  ];
  
});
