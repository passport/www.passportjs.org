define(['./base',
        'class',
        'jquery', 'jquery.pjax'],
function(Controller, clazz, $, __$_pjax) {
  
  function PjaxController(basePath, path) {
    if (!path) {
      path = basePath[basePath.length - 1] == '/' ? basePath : basePath + '/';
    }
    
    Controller.call(this, basePath);
    this.canonicalPath = path;
  }
  clazz.inherits(PjaxController, Controller);
  
  PjaxController.prototype.load = function(ctx) {
    var self = this
      , url = (typeof this.canonicalPath == 'string') ? this.canonicalPath : ctx.canonicalPath;
    
    // XXX: workaround to prevent `jquery-pjax` from replacing state, and
    //      wreaking havoc with page's popstate handler.
    $.pjax.state = window.history.state;
    
    $.pjax({ url: url, container: '#content', fragment: '#content', push: false })
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
