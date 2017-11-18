define(['exports', 'jquery', 'jquery.pjax'], function(exports, $, __$_pjax) {
  
  $(document).ready(function() {
    //$('body').toggleClass('pjax-loading', true);
    //return
    
    $(document).on('pjax:start', function () {
      console.log('pjax:start');
    });
    
    $(document).on('pjax:send', function () {
      console.log('pjax:send');
      exports.activity(true);
    });
    
    $(document).on('pjax:complete', function () {
      console.log('pjax:complete');
      exports.activity(false);
    });
    
    $(document).on('pjax:end', function () {
      console.log('pjax:end');
    });
    
    $(document).on('pjax:click', function () {
      console.log('pjax:click');
      togglePjaxLoading(true);
    });

    $(document).on('pjax:beforeReplace', function () {
      console.log('pjax:beforeReplace');
      togglePjaxLoading(false);
    });
    
  });
  
  
  var _timeoutID = 0;
  
  exports.activity = function(flag) {
    console.log('ACTIVITY? ' + flag);
    console.log(_timeoutID)
    
    // do not add pjax-loading flag twice
    // wait for it to resolve or be canceled
    if (flag && _timeoutID) {
      return;
    }
    
  };
  
  
  var loadingTimeout = 0;
  
  function togglePjaxLoading(toggle) {
    // do not add pjax-loading flag twice
    // wait for it to resolve or be canceled
    if (toggle && loadingTimeout) {
      return;
    }

    // cancel timer if toggle false
    // and remove pjax-loading flag
    if (!toggle) {
      clearTimeout(loadingTimeout);
      $('body').toggleClass('pjax-loading', false);
      return;
    }

    // save timeout timer and await to add
    // pjax-loading flag
    loadingTimeout = setTimeout(function () {
      $('body').toggleClass('pjax-loading', true);
    }, 300);
  }
  
});
