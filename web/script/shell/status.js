define(['exports', 'jquery', 'jquery.pjax'], function(exports, $, __$_pjax) {
  
  var _tid = 0;
  
  exports.activity = function(flag) {
    // do not add pjax-loading flag twice
    // wait for it to resolve or be canceled
    if (flag && _tid) {
      return;
    }
    
    // cancel timer if toggle false
    // and remove pjax-loading flag
    if (!flag) {
      clearTimeout(_tid); _tid = 0;
      $('body').toggleClass('is-loading', false);
      return;
    }
    
    // save timeout timer and await to add
    // pjax-loading flag
    _tid = setTimeout(function () {
      $('body').toggleClass('is-loading', true);
    }, 300);
  };
  
  
  $(document).ready(function() {
    $(document).on('pjax:send', function () {
      exports.activity(true);
    });

    $(document).on('pjax:beforeReplace', function () {
      exports.activity(false);
    });
  });
  
});
