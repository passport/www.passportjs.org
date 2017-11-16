define(function() {
  
  return {
    
    scrollToElementById: function(id) {
      var units = $('#'+id).offset().top - 30;
      $('html, body').animate({ scrollTop: units }, 500);
    }
  
  };
  
});
