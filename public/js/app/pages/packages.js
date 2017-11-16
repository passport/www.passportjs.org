define(['jquery'], function($) {
  
  function openSearch() {
    // open search
    $("body").addClass("is-search");
    // focus input
    $(".search-con form input.tt-input").focus();
    // render results
    // XXX
    //renderFeaturedStrategies();
  }
  
  function closeSearch () {
    // closing search
    $("body").removeClass("is-search");
    // cleaning inputs
    $(".search-con form input").text('');
    $(".search-con form input").blur();
    $('.tt-input, .tt-hint').removeClass('bigger');
    // cleaning results
    $(".results section").html('');
    $(".search-con .info-line span").text('0');
  }
  
  
  function doclose(ev) {
    window.history.back();
  }
  
  function onkeyup(ev) {
    if (ev.keyCode == 27) {
      window.history.back();
    }
  }
  
  return {
    enter: [
      function(ctx, next) {
        openSearch();
        
        $('.search-con .close-ico').on('click', doclose);
        $(document).on('keyup', onkeyup);
        
        next();
      },
      function(ctx, next) { ctx.handled = true; }
    ],
  
    exit: [
      function(ctx, next) {
        $(document).off('keyup', onkeyup);
        $('.search-con .close-ico').off('click', doclose);
        
        closeSearch();
        next();
      },
      function(ctx, next) { ctx.handled = true; }
    ]
  };
  
});
