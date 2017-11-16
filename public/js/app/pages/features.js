define(['./middleware/pjax',
        './middleware/browse',
        './middleware/ad/refresh',
        './middleware/handled'],
function(pjax, browse, adRefresh, handled) {
  
  return [
    pjax('#page-content', '#page-content'),
    browse('/features/', true),
    adRefresh(),
    handled()
  ];
  
});
