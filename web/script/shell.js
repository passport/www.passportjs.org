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
  
  function onkeyup(ev) {
    if (ev.keyCode == 27) { // esc
      window.history.back();
    }
  }
  
  
  exports.menu = menu;
  
  exports.show = function(controller, ctx, cb) {
    var ccontroller = _controllers[_controllers.length - 1];
    if (ccontroller === controller) { return cb(); }
    if (ccontroller) {
      _controllers.pop();
      ccontroller.unload();
    }
    _controllers.push(controller)
    
    controller.once('ready', function() {
      _gotopOffset = $('.go-top').offset();
      
      menu.active(this.basePath);
      cb();
    });
    
    controller.shell = exports;
    if (!ctx.init) {
      controller.load(ctx);
    } else {
      controller.emit('ready');
    }
  };
  
  exports.present = function(controller, ctx, cb) {
    _controllers.push(controller)
    
    controller.once('ready', function() {
      this.isModal = true;
      $(document).on('keyup', onkeyup);
      cb();
    });
    
    controller.shell = exports;
    if (!ctx.init) {
      controller.load(ctx);
    } else {
      controller.emit('ready');
    }
  };
  
  exports.dismiss = function() {
    var ccontroller = _controllers.pop();
    if (ccontroller) {
      ccontroller.unload();
      $(document).off('keyup', onkeyup);
      ccontroller.isModal = undefined;
    }
  };
  
  exports.scrollToElementById = function(id) {
    var offset =  $('#'+id).offset();
    if (!offset) { return; }
    var px = offset.top - 30;
    $('html, body').animate({ scrollTop: px }, 500);
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
    var ccontroller = _controllers[_controllers.length - 1];
    if (ccontroller && ccontroller.isModal) {
      exports.dismiss();
    }
    next();
  });
  
});
