$(document).ready(function() {
  var $submenu, $gotop, submenuOffset, gotopOffset;
  var data = [];
  var loadingTimeout = 0;

  /**
   * highlight js configuration
   */

  hljs.configure({ classPrefix: '' });

  /**
   * PJAX configuration
   */

  $(document).pjax('a[data-pjax]', '#page-content', {
    fragment: '#page-content',
    timeout: 1200
  });

  $(document).on('pjax:click', function () {
    togglePjaxLoading(true);
    toggleResponsiveMenu(false);
  });

  $(document).on('pjax:beforeReplace', function () {
    togglePjaxLoading(false);
  });

  $(document).on('pjax:end', function () {
    sidebarToggle();
    initialize();
  });

  /**
   * Initialize page
   */

  initialize();

  /**
   * Load for remote Data only once
   */

  // No longer needed, rendered into page at static generation time.
  /*
  $.getJSON('repo.json', function(data) {
    $(".social .stat").text(numberWithCommas(data.stargazers_count));
  });
  */
  
  // $.getJSON("data.json", function(qdata) {
  //   data = qdata;
  // });

  /**
   * Bind plugins and even handlers
   */

  $("body").toggleClass("ie", msieversion());

  var strategies = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    sorter: sorter,
    identify: function(item) {
      return item.label;
    },
    prefetch: {
      url: 'data.json',
      cache: false
    }
  });

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
    var $results = $('.search-con .tt-menu .tt-dataset article').clone();
    $results.appendTo($('.search-con .results section').html(''));
    $(".search-con .info-line span").text($results.length);
    if ($('.search-con .results').hasScrollBar()) {
      $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    } else {
      $(".search-con .results section").css({ paddingLeft: 0 })
    };
  });

  $(document).on('input', '.search-con form input', function (ev) {
    if (!$(this).val().length) {
      renderFeaturedStrategies();
    };
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
    if (ev.keyCode !== 27) { return; }
    closeSearch.call(this, ev);
  });

  $(document).on('focus', '[placeholder]', function () {
    var $input = $(this);
    if ($input.val() == $input.attr('placeholder')) {
      $input.val('').removeClass("placeholder");
    }
  });

  $(document).on('blur', '[placeholder]', function () {
    var $input = $(this);
    // if ($input.val() == '' || $input.val() == $input.attr('placeholder')) {
    //   $input.val($input.attr('placeholder')).addClass("placeholder");
    // }
  })

  $(window).resize(function() {
    if ($('.search-con .results').hasScrollBar()) {
      $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    } else {
      $(".search-con .results section").css({ paddingLeft: 0 })
    };
  });

  // menu nav docs
  $(window).on('scroll', function (ev) {
    toggleFixedNavigation(ev);
    toggleActiveSections(ev);
  });

  $(document).on('click', '.sub-menu nav a:not([data-search])', function (ev) {
    var $el = $(this);
    var id = $el.attr('href');
    var scroll = $(id).offset().top - 30;
    $('html, body').animate({ scrollTop: scroll }, 500);
  });
  // end menu nav docs

  /*
   * Accordion
   */
  $('.accordion').accordion({
    "transitionSpeed": 400
  });

  /**
   * Contextual helpers
   * Depends on globally context variable values
   */

  function toggleFixedNavigation(ev) {
    $submenu.toggleClass('fixed', submenuOffset && submenuOffset.top < $(window).scrollTop());
    $gotop.toggleClass('fixed', gotopOffset && gotopOffset.top < $(window).scrollTop());
  }

  function toggleActiveSections(ev) {
    var sections = $('.entry section');
    var submenu_height = $submenu.outerHeight();
    var cur_pos = $(window).scrollTop();

    sections.each(function() {
      var top = $(this).offset().top - 50;
      var bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        $submenu.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        $submenu.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
      }
    });
  }

  function initialize() {
    // reset containers
    $submenu = $('.sub-menu nav');
    $gotop = $('.go-top');
    submenuOffset = $submenu.offset();
    gotopOffset = $gotop.offset();

    // reset syntax highlight
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });

    // animate docs scroll
    if (/^\/docs/.test(window.location.pathname) && window.location.hash) {
      var scroll = $(window.location.hash).offset().top - 30;
      $('html, body').animate({ scrollTop: scroll }, 500);

    }
  }

  function sidebarToggle() {
    var $menu = $('#menu');

    // reset active menu
    $menu.find('li.active').removeClass('active');

    // set current active menu
    $menu.find('a[href="' + window.location.pathname + '"]').parent('li').addClass('active');
  }

  function closeSearch () {
    $(".search form input").val("");
    $("body").removeClass("is-search");
    $(".main-hold").removeClass('blured');
    $(".search-con form .input").text('');
    $(".results section").html('');
    $(".search-con .info-line span").text('0');
  }

  function openSearch() {
    var val = $(this).val();
    $(".main-hold").addClass('blured');
    $("body").addClass("is-search");
    $(".search-con form input").val(val).focus();
    renderFeaturedStrategies();
  }

  function toggleResponsiveMenu(open) {
    $("body").toggleClass("is-menu", open);
    $(".content, .top-site").toggleClass('blured', open);
    $('.menu-trigger').toggleClass("is-active", open).next().toggleClass("is-active", open);
  }

  function renderFeaturedStrategies() {
    var $featured = $.map(strategies.all().sort(sorter), templateItem);

    $('.search-con .results section').html($featured);
    $(".search-con .info-line span").text($featured.length);
  }

  function templateItem(item) {
    return '<article' + (item.featured ? ' class="featured"' : '') + '><a href="'+ item.url +'"><span class="title">'+ item.label +'</span><span class="text">'+ item.desc +'</span>' + (item.featured ? '<span class="featured-flag">Featured</span>' : '') + '<span class="stat"><span class="download">'+ item.forks +'</span><span class="star">'+ item.stars +'</span></span></a></article>'
  }

  function starsSorter (a, b) {
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
