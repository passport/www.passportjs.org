define(['./middleware/pjax', './middleware/nav', './middleware/ad/refresh'], function(pjax, nav, adRefresh) {
  
  return [
    pjax('#page-content', '#page-content'),
    nav('/features/'),
    adRefresh(),
    function(ctx, next) {
      ctx.handled = true;
      next();
    }
  ];
  
});
