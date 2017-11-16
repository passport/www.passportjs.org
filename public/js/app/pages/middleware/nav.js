define(['jquery'], function($) {
  
  return function(url) {
    
    return function nav(ctx, next) {
      if (ctx.init) { return next(); }
      
      var menu = $('#menu');
      // reset active menu
      menu.find('li.active').removeClass('active');
      // set current active menu
      menu.find('a[href="' + url + '"]').parent('li').addClass('active');
    };
  };
  
});
