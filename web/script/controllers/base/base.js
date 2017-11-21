define(['events',
        'class'],
function(Emitter, clazz) {
  
  function Controller(basePath) {
    Emitter.call(this);
    this.shell = undefined;
    this.basePath = basePath;
  }
  clazz.inherits(Controller, Emitter);
  
  Controller.prototype.load = function() {};
  Controller.prototype.unload = function() {};
  
  Controller.prototype.dispatch = function(ctx, done) { return done(); }
  
  
  return Controller;
  
});
