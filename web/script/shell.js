define(['exports',
        './shell/menu',
        './shell/search',
        './shell/status',
        'page',
        'jquery'],
function(exports, menu, search, status, page, $) {
  
  // static
  var _gotopOffset;
  var _controllers = [];
  var _modalController;
  
  function onkeyup(ev) {
    if (ev.keyCode == 27) { // esc
      window.history.back();
    }
  }
  
  
  exports.menu = menu;
  
  exports.show = function(controller, loaded, cb) {
    if (typeof loaded == 'function') {
      cb = loaded;
      loaded = false;
    }
    
    var ccontroller = _controllers.pop();
    if (ccontroller === controller) { return cb(); }
    if (ccontroller) {
      ccontroller.unload();
    }
    _controllers.push(controller)
    
    controller.once('ready', function() {
      _gotopOffset = $('.go-top').offset();
      
      menu.active(this.canonicalPath || this.basePath);
      cb();
    });
    
    controller.shell = exports;
    if (!loaded) {
      controller.load();
    } else {
      controller.emit('ready');
    }
  };
  
  exports.present = function(controller, loaded, cb) {
    _modalController = controller;
    
    controller.once('ready', function() {
      if (this !== _modalController) { return; }
      $(document).on('keyup', onkeyup);
      cb();
    });
    
    controller.shell = exports;
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
  
  
  $(document).ready(function() {
    _gotopOffset = $('.go-top').offset();
    
    $(window).on('scroll', function (ev) {
      // toggleFixedNavigation
      $('.go-top').toggleClass('fixed', _gotopOffset && _gotopOffset.top < $(window).scrollTop());
    });
    
    $(document).on('click', 'a[href="#top"]', function(ev) {
      exports.scrollToElementById('top');
      return false;
    });
  });
  
  page.exit('*', function(ctx, next) {
    if (_modalController) {
      exports.dismiss();
    }
    next();
  });
  
});
