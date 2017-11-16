define(['exports'], function(exports) {
  
  function toggleMenu(open) {
    console.log('TOGGLE MENU');
    
    $("html").toggleClass("is-menu", open);
    $(".content, .top-site").toggleClass('blured', open);
    $('.menu-trigger').toggleClass("is-active", open).next().toggleClass("is-active", open);
    
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
