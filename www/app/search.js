define(['bloodhound', 'jquery'],
function(Bloodhound, $) {

  function templateItem(item) {
    return '<article' + (item.featured ? ' class="featured"' : '') + '><a href="'+ item.url +'" target="_blank"><span class="title">'+ item.label +'</span><span class="text">'+ item.desc +'</span>' + (item.featured ? '<span class="featured-flag">Featured</span>' : '') + '<span class="stat"><span class="download">'+ item.forks +'</span><span class="star">'+ item.stars +'</span></span></a></article>'
  }

  function ontypeaheadrender() {
  }

  // search
  function starsSorter (a, b) {
    if (a.stars && !b.stars) return -1;
    if (b.stars && !a.stars) return 1;
    return +b.stars - (+a.stars);
  }
  
  function featuredSorter (a, b) {
    if (a.featured && !b.featured) return -1;
    if (b.featured && !a.featured) return 1;
    return 0;
  }
  
  function sorter (a, b) {
    var first = featuredSorter(a, b);
    if (first) return first;
    return starsSorter(a, b);
  }
  
  var strategies = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('label'),
    queryTokenizer: Bloodhound.tokenizers.nonword,
    sorter: sorter,
    identify: function(item) {
      return item.label;
    },
    prefetch: {
      url: '/data.json',
      cache: false
    }
  });


  return function(sel) {
    var el = $(sel);
    
    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('.search-con form input').typeahead(null, {
      name: 'strategies',
      display: 'label',
      limit: Infinity,
      source: strategies,
      templates: {
        suggestion: templateItem
      }
    });
    
    $(document).on('focus', '.search form input', function(ev) {
      console.log('FOCUS BOX');
      //openSearch.call(this, ev);
      
      // open search
      $("body").addClass("is-search");
      // focus input
      // TODO: What is tt-input?
      el.find('form input.tt-input').focus();
      
    });
    
    // This event is fired when the search box receives focus.
    el.find('form input').on('focus', function onfocus(ev) {
      var empty = !!!$(this).val().length;
      
      // TODO: Optimize this, only do it if no child elements.  Input event
      //       handles this when length back to 0.
      if (empty) {
        renderFeaturedStrategies();
      }
    });
    
    // This event is fired when the value of the search box changes.
    el.find('form input.tt-input').on('input', function(ev) {
      var empty = !!!$(this).val().length;

      $(this).toggleClass('bigger', !empty);
      $('.tt-hint').toggleClass('bigger', !empty);

      if (empty) {
        renderFeaturedStrategies();
      }
    });
    
    el.find('form input').on('typeahead:render', function(ev) {
      // TODO: Better element targetting, without selector assumptions
      var $results = $('.search-con .tt-menu .tt-dataset article').clone();
      $results.appendTo($('.search-con .results section').html(''));
      $(".search-con .info-line span").text($results.length);
      // if ($('.search-con .results').hasScrollBar()) {
      //   $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
      // } else {
      //   $(".search-con .results section").css({ paddingLeft: 0 })
      // };
    });
    
    $(document).on('click', '.search-con .close-ico', function(ev) {
      closeSearch.call(this, ev);
    });

    $(document).keyup(function(ev) {
      if (ev.keyCode == 27) {
        closeSearch.call(this, ev);
      }
    });
    
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
    
    /*
    $('form').submit(function( event ) {
      console.log('SUBMIT!');
      
      window.history.pushState({ q: 'foo' }, "Search", "/search?q=foo");
      event.preventDefault();
    });
    */
    
    
    function renderFeaturedStrategies() {
      strategies.initPromise.done(loaded);
      function loaded() {
        var $featured = $.map(strategies.all().sort(sorter), templateItem);
        $('.search-con .results section').html($featured);
        $(".search-con .info-line span").text($featured.length);
      }
    }
  }
  
});
