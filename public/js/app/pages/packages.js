define(['../search/packages', '../search/packages/sort', 'jquery'], function(packages, sort, $) {
  
  function templateItem(item) {
    return '<article' + (item.featured ? ' class="featured"' : '') + '><a href="'+ item.url +'" target="_blank"><span class="title">'+ item.label +'</span><span class="text">'+ item.desc +'</span>' + (item.featured ? '<span class="featured-flag">Featured</span>' : '') + '<span class="stat"><span class="download">'+ item.forks +'</span><span class="star">'+ item.stars +'</span></span></a></article>'
  }
  
  function renderFeaturedStrategies() {
    packages.initPromise.done(loaded);
    function loaded() {
      var $featured = $.map(packages.all().sort(sort), templateItem);
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
