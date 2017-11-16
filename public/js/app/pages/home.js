define(['./middleware/pjax'], function(pjax) {
  
  return [
    pjax('#page-content', '#page-content'),
    function(ctx, next) { ctx.handled = true; }
  ];
  
});
