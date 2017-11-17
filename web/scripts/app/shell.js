define(['./shell/menu', 'jquery', 'exports'], function(menu, $, exports) {
  
  // static
  var _controller;
  var _modalController;
  
  function onkeyup(ev) {
    if (ev.keyCode == 27) { // esc
      window.history.back();
    }
  }
  
  
  exports.menu = menu;
  
  exports.browse = function(url, loaded) {
    if (_controller) {
      _controller.unload();
      _controller = null;
    }
    menu.active(url);
  };
  
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
  };
  
  exports.present = function(controller, cb) {
    _modalController = controller;
    _modalController.load(function() {
      if (this !== _modalController) { return; }
      $(document).on('keyup', onkeyup);
      this.ready();
      cb();
    }.bind(_modalController));
  };
  
  exports.dismiss = function() {
    if (_modalController) {
      _modalController.unload();
      $(document).off('keyup', onkeyup);
      _modalController = null;
    }
  };
  
  exports.scrollToElementById = function(id) {
    var units = $('#'+id).offset().top - 30;
    $('html, body').animate({ scrollTop: units }, 500);
  };
  
});
