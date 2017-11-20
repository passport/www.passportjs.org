define(['./base/pjax',
        'class',
        'jquery', 'jquery.pjax'],
function(PjaxController, clazz, $, __$_pjax) {
  
  function HomeController() {
    PjaxController.call(this, '', '/');
  }
  clazz.inherits(HomeController, PjaxController);
  
  
  return new HomeController();
  
});
