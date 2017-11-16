define(['./middleware/pjax'], function(pjax) {
  
  return [
    function(ctx, next) {
      if (ctx.init) { return; }
      next();
    },
    pjax('#page-content', '#page-content')
  ];
  
});
