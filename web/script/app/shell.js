define(['exports',
        './shell/menu',
        './shell/search',
        './shell/status',
        'jquery'],
function(exports, menu, search, status, $) {
  
  // static
  var _gotopOffset;
  var _submenuOffset;
  var _controller;
  var _modalController;
  
  function onkeyup(ev) {
    if (ev.keyCode == 27) { // esc
      window.history.back();
    }
  }
  
  
  exports.menu = menu;
  
  exports.show = function(controller, loaded, cb) {
    if (_controller === controller) { return cb(); }
    
    if (_controller) {
      _controller.unload();
    }
    
    _controller = controller;
    
    controller.once('ready', function() {
      menu.active(this.basePath + '/');
      cb();
    });
    
    controller.shell = this;
    controller.load();
    
    // XXX
    return;
    
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
    
    controller.once('ready', function() {
      if (this !== _modalController) { return; }
      $(document).on('keyup', onkeyup);
      cb();
    });
    
    controller.shell = this;
    controller.load();
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
  
  exports.trackLayout = function() {
    _gotopOffset = $('.go-top').offset();
    _submenuOffset = $('.sub-menu nav').offset();
    
    // accordion
    /*
    $('.accordion').accordion({
      "transitionSpeed": 400
    });
    */
  };
  
  
  $(document).ready(function() {
    exports.trackLayout();
    
    $(window).on('scroll', function (ev) {
      // toggleFixedNavigation
      $('.go-top').toggleClass('fixed', _gotopOffset && _gotopOffset.top < $(window).scrollTop());
      $('.sub-menu nav').toggleClass('fixed', _submenuOffset && _submenuOffset.top < $(window).scrollTop());
    });
    
    $(document).on('click', 'a[href="#top"]', function(ev) {
      exports.scrollToElementById('top');
      return false;
    });
  });
  
});
