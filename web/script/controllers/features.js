define(['./base/pjax',
        'class'],
function(PjaxController, clazz) {
  
  function FeaturesController() {
    PjaxController.call(this, '/features');
  }
  clazz.inherits(FeaturesController, PjaxController);
  
  
  return new FeaturesController();
  
});
