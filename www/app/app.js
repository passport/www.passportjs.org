define(['jquery', 'highlight', 'bloodhound', 'jquery.typeahead'],
function($, hljs, Bloodhound, __$_typeahead) {

  $(document).ready(function() {
    
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
    
    function templateItem(item) {
      return '<article' + (item.featured ? ' class="featured"' : '') + '><a href="'+ item.url +'" target="_blank"><span class="title">'+ item.label +'</span><span class="text">'+ item.desc +'</span>' + (item.featured ? '<span class="featured-flag">Featured</span>' : '') + '<span class="stat"><span class="download">'+ item.forks +'</span><span class="star">'+ item.stars +'</span></span></a></article>'
    }
    
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
    
    $('.search-con form input').bind('typeahead:render', function (ev) {
      console.log('RENDER!')
      
      var $results = $('.search-con .tt-menu .tt-dataset article').clone();
      $results.appendTo($('.search-con .results section').html(''));
      $(".search-con .info-line span").text($results.length);
      // if ($('.search-con .results').hasScrollBar()) {
      //   $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
      // } else {
      //   $(".search-con .results section").css({ paddingLeft: 0 })
      // };
    });

    $(document).on('input', '.search-con form input.tt-input', function (ev) {
      console.log('INPUT')
      
      var nonempty = !!$(this).val().length;

      $(this).toggleClass('bigger', nonempty);
      $('.tt-hint').toggleClass('bigger', nonempty);

      if (!nonempty) {
        renderFeaturedStrategies();
      }
    });
    
    $(document).on('click', '.go-top', function(ev) {
      scrollToId('#top');
      return false;
    });

    $(document).on('click', '.menu-trigger', function(ev) {
      toggleResponsiveMenu();
      return false;
    });

    $(document).on('focus', '.search form input', function(ev) {
      openSearch.call(this, ev);
    });

    $(document).on('click', '[data-search]', function(ev) {
      ev.preventDefault();
      openSearch.call(this, ev);
    });

    $(document).on('click', '.search-con .close-ico', function(ev) {
      closeSearch.call(this, ev);
    });

    $(document).keyup(function(ev) {
      if (ev.keyCode == 27) {
        closeSearch.call(this, ev);
      }
    });

    $(document).on('focus', '[placeholder]', function () {
      var $input = $(this);
      if ($input.val() == $input.attr('placeholder')) {
        $input.val('').removeClass("placeholder");
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

    function openSearch() {
      // open search
      $("body").addClass("is-search");
      // focus input
      $(".search-con form input.tt-input").focus();
      // render results
      renderFeaturedStrategies();
    }
    
    function renderFeaturedStrategies() {
      strategies.initPromise.done(loaded);
      function loaded() {
        var $featured = $.map(strategies.all().sort(sorter), templateItem);
        $('.search-con .results section').html($featured);
        $(".search-con .info-line span").text($featured.length);
      }
    }
    
    
    // homepage
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    $.getJSON('/repo.json', function(data) {
      $(".social .stat").text(numberWithCommas(data.stargazers_count));
    });
  
  
    // docs
    hljs.configure({ classPrefix: '' });
  
    // reset syntax highlight
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
  
  
  });

});
