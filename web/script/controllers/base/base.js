define(['events',
        'class'],
function(Emitter, clazz) {
  
  function Controller(basePath) {
    Emitter.call(this);
    this.shell = undefined;
    this.basePath = basePath;
  }
  clazz.inherits(Controller, Emitter);
  
  Controller.prototype.dispatch = function(ctx, next) {
    ctx.handled = true;
    return next();
  }
  Controller.prototype.load = function() {};
  Controller.prototype.unload = function() {};
  
  
  return Controller;
  
});
