define(['jquery', 'exports'], function($, exports) {
  
  function toggleMenu(open) {
    $("html").toggleClass("is-menu", open);
    $(".content, .top-site").toggleClass('blured', open);
    $('.menu-trigger').toggleClass("is-active", open).next().toggleClass("is-active", open);
    
  }
  
  
  
  exports.active = function(url) {
    var menu = $('#menu');
    // reset active menu
    menu.find('li.active').removeClass('active');
    // set current active menu
    menu.find('a[href="' + url + '"]').parent('li').addClass('active');
  }
  
  exports.open = function() {
    toggleMenu();
  }
  
  exports.close = function() {
    toggleMenu(false);
  }
  
  exports.toggle = function() {
    toggleMenu();
  }
  
});
