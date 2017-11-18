define(['./middleware/handled',
        '../controllers/packages',
        '../shell'],
function(handled, controller, shell) {
  
  return {
    enter: [
      function(ctx, next) {
        shell.present(controller, function() {
          next();
        });
      },
      handled()
    ],
  
    exit: [
      function(ctx, next) {
        shell.dismiss();
        next();
      }
    ]
  };
  
});
