define(['events',
        'class'],
function(Emitter, clazz) {
  
  function Controller(basePath) {
    Emitter.call(this);
    this.basePath = basePath;
  }
  clazz.inherits(Controller, Emitter);
  
  Controller.prototype.load = function() {};
  Controller.prototype.unload = function() {};
  
  
  return Controller;
  
});
