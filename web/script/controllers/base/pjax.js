define(['./base',
        'class',
        'jquery', 'jquery.pjax'],
function(Controller, clazz, $, __$_pjax) {
  
  function PjaxController(basePath, path) {
    Controller.call(this, basePath);
    this.canonicalPath = path;
  }
  clazz.inherits(PjaxController, Controller);
  
  PjaxController.prototype.load = function() {
    var self = this;
    
    // XXX: workaround to prevent `jquery-pjax` from replacing state, and
    //      wreaking havoc with page's popstate handler.
    $.pjax.state = window.history.state;
    
    $.pjax({ url: this.canonicalPath, fragment: '#page-content', container: '#page-content', push: false })
      .done(function(data) {
        self.emit('ready');
      });
  };
  
  PjaxController.prototype.dispatch = function(ctx, done) {
    ctx.handled = true;
    PjaxController.super_.prototype.dispatch.call(this, ctx, done);
  }
  
  
  return PjaxController;
  
});
