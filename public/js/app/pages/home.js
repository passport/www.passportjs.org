define(['./middleware/pjax',
        './middleware/nav',
        './middleware/ad/refresh',
        './middleware/handled'],
function(pjax, nav, adRefresh, handled) {
  
  return [
    pjax('#page-content', '#page-content'),
    nav('/'),
    adRefresh(),
    handled()
  ];
  
});
