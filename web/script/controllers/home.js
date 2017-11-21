define(['./base/pjax',
        'class'],
function(PjaxController, clazz) {
  
  function HomeController() {
    PjaxController.call(this, '', '/');
  }
  clazz.inherits(HomeController, PjaxController);
  
  
  return new HomeController();
  
});
