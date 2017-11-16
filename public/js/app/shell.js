define(['./shell/menu', 'jquery', 'exports'], function(menu, $, exports) {
  
  // static
  var _controller;
  
  
  exports.menu = menu;
  
  exports.browse = function(url) {
    if (_controller) {
      _controller.unload();
      _controller = null;
    }
    menu.active(url);
  }
  
  exports.show = function(controller, loaded, cb) {
    if (typeof loaded == 'function') {
      cb = loaded;
      loaded = false;
    }
    
    if (_controller === controller) { return cb(); }
    _controller = controller;
    
    if (!loaded) {
      _controller.load(function() {
        if (this !== _controller) { return; }
        this.ready();
        menu.active(this.basePath);
        cb();
      }.bind(_controller));
    } else {
      _controller.ready();
      cb();
    }
  }
  
  exports.scrollToElementById = function(id) {
    var units = $('#'+id).offset().top - 30;
    $('html, body').animate({ scrollTop: units }, 500);
  }
  
});
