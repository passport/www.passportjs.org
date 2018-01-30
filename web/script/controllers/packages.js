define(['../search/packages/engine',
        '../search/packages/sort',
        '../search/packages/templates/result',
        '../shell',
        './base/base',
        'class',
        'jquery',
        'exports'],
function(engine, sort, template, shell, Controller, clazz, $, exports) {
  
  
  function renderFeaturedStrategies() {
    engine.initPromise.done(loaded);
    function loaded() {
      var $featured = $.map(engine.all().sort(sort), template);
      $('.search-con .results section').html($featured);
      $(".search-con .info-line span").text($featured.length);
    }
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
    if (!async) {
      $('.search-con .results section').html(results);
    } else {
      $('.search-con .results section').append(results);
    }
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
  
  
  
  function PackagesController() {
    Controller.call(this, '/packages');
    
    this.on('ready', function() {
      $('.search-con form input.tt-input').on('input', dosearchinput);
      $('.search-con form input').on('typeahead:render', dosearchresults);
      $('.search-con .close-ico').on('click', doclose);
    });
  }
  clazz.inherits(PackagesController, Controller);
  
  PackagesController.prototype.load = function() {
    // open search
    $("body").addClass("is-search");
    // focus input
    $(".search-con form input.tt-input").focus();
    // render results
    renderFeaturedStrategies();
    
    this.emit('ready');
  };
  
  PackagesController.prototype.unload = function() {
    $('.search-con .close-ico').off('click', doclose);
    $('.search-con form input').off('typeahead:render', dosearchresults);
    $('.search-con form input.tt-input').off('input', dosearchinput);
    
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
  
  PackagesController.prototype.dispatch = function(ctx, done) {
    ctx.handled = true;
    PackagesController.super_.prototype.dispatch.call(this, ctx, done);
  }
  
  
  return new PackagesController();
  
});
