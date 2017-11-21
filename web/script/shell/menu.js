define(['exports', 'jquery'], function(exports, $) {
  
  exports.active = function(url) {
    var menu = $('#menu');
    // reset active menu
    menu.find('li.active').removeClass('active');
    // set current active menu
    menu.find('a[href="' + url + '"]').parent('li').addClass('active');
  };
  
  exports.open = function() {
    exports.toggle(true);
  };
  
  exports.close = function() {
    exports.toggle(false);
  };
  
  exports.toggle = function(open) {
    $('html').toggleClass('is-menu', open);
    $('.content, .top-site').toggleClass('blured', open);
    $('.menu-trigger').toggleClass('is-active', open).next().toggleClass('is-active', open);
  };
  
  
  $(document).ready(function() {
    
    $(document).on('click', '.menu-trigger', function(ev) {
      exports.toggle();
      return false;
    });
    
  });
  
});
