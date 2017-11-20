define(['./base/base',
        'class',
        'jquery', 'jquery.pjax'],
function(Controller, clazz, $, __$_pjax) {
  
  
  function HomeController() {
    Controller.call(this, '');
  }
  clazz.inherits(HomeController, Controller);
  
  HomeController.prototype.load = function() {
    var self = this;
    $.pjax({ url: '/', fragment: '#page-content', container: '#page-content', push: false })
      .done(function(data) {
        self.emit('ready');
      });
  };
  
  
  return new HomeController();
  
});
