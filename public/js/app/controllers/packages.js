define(['../search/packages/engine',
        '../search/packages/sort',
        '../search/packages/templates/result',
        '../shell',
        'jquery',
        'exports'],
function(engine, sort, template, shell, $, exports) {
  
  
  function renderFeaturedStrategies() {
    engine.initPromise.done(loaded);
    function loaded() {
      var $featured = $.map(engine.all().sort(sort), template);
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
  
  function dosearchinput(ev) {
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
  
  function dosearchresults(ev, suggestions, async, dataset) {
    var results = $.map(suggestions, template);
    $('.search-con .results section').html(results);
    $(".search-con .info-line span").text(results.length);
    // if ($('.search-con .results').hasScrollBar()) {
    //   $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    // } else {
    //   $(".search-con .results section").css({ paddingLeft: 0 })
    // };
  }
  
  function doclose(ev) {
    window.history.back();
  }
  
  
  
  exports.basePath = '/packages/';
  
  exports.load = function(cb) {
    openSearch();
    cb();
  };
  
  exports.ready = function() {
    console.log('READY PACKAGES...');
    
    $('.search-con form input.tt-input').on('input', dosearchinput);
    $('.search-con form input').on('typeahead:render', dosearchresults);
    $('.search-con .close-ico').on('click', doclose);
  };
  
  exports.unload = function() {
    $('.search-con .close-ico').off('click', doclose);
    $('.search-con form input').off('typeahead:render', dosearchresults);
    $('.search-con form input.tt-input').off('input', dosearchinput);
    
    closeSearch();
  };
  
});
