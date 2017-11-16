define(['../search/packages', '../search/packages/sort', '../search/packages/template', 'page', 'jquery'], function(packages, sort, template, page, $) {
  
  function renderFeaturedStrategies() {
    packages.initPromise.done(loaded);
    function loaded() {
      var $featured = $.map(packages.all().sort(sort), template);
      $('.search-con .results section').html($featured);
      $(".search-con .info-line span").text($featured.length);
    }
  }
  
  function openSearch() {
    // open search
    $("body").addClass("is-search");
    // focus input
    $(".search-con form input.tt-input").focus();
    // render results
    renderFeaturedStrategies();
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
  
  
  function dosearch(ev) {
    //ev.stopPropagation();
    //page.show('/search');
    
    var q = $(this).val()
      , nonempty = !!q.length;
    $(this).toggleClass('bigger', nonempty);
    $('.tt-hint').toggleClass('bigger', nonempty);
    
    if (!nonempty) {
      renderFeaturedStrategies();
    }
  }
  
  function doclose(ev) {
    window.history.back();
  }
  
  function onkeyup(ev) {
    if (ev.keyCode == 27) { // esc
      window.history.back();
    }
  }
  
  return {
    enter: [
      function(ctx, next) {
        console.log('---');
        openSearch();
        
        $('.search-con form input.tt-input').on('input', dosearch);
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
        $('.search-con form input.tt-input').off('input', dosearch);
        
        closeSearch();
        next();
      },
      function(ctx, next) { ctx.handled = true; }
    ]
  };
  
});
