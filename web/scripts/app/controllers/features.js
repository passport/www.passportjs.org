define(['./base',
        'class',
        'jquery', 'jquery.pjax'],
function(Controller, clazz, $, __$_pjax) {
  
  
  function FeaturesController() {
    Controller.call(this, '/features');
  }
  clazz.inherits(FeaturesController, Controller);
  
  FeaturesController.prototype.load = function() {
    var self = this;
    $.pjax({ url: '/features/', fragment: '#page-content', container: '#page-content', push: false })
      .done(function(data) {
        self.emit('ready');
      });
  };
  
  
  return new FeaturesController();
  
});
