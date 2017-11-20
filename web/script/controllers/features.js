define(['./base/pjax',
        'class',
        'jquery', 'jquery.pjax'],
function(PjaxController, clazz, $, __$_pjax) {
  
  function FeaturesController() {
    PjaxController.call(this, '/features', '/features/');
  }
  clazz.inherits(FeaturesController, PjaxController);
  
  
  return new FeaturesController();
  
});
