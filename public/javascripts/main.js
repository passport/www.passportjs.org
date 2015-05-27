$(document).ready(function() {
  var $submenu, $gotop, submenuOffset, gotopOffset;
  var data = [];
  var loadingTimeout = 0;

  /**
   * highlight js configuration
   */

  hljs.configure({ classPrefix: '' });

  /**
   * Strategies Search Engine initialization
   */

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

  /**
   * PJAX configuration
   */

  $(document).pjax('a[data-pjax]', '#page-content', {
    fragment: '#page-content',
    timeout: 1200
  });

  $(document).on('pjax:popstate', function () {
    closeSearch.call(document);
  })

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

  $.getJSON('/repo.json', function(data) {
    $(".social .stat").text(numberWithCommas(data.stargazers_count));
  });

  /**
   * Bind plugins and even handlers
   */

  $("body").toggleClass("ie", msieversion());

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
    // if ($('.search-con .results').hasScrollBar()) {
    //   $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    // } else {
    //   $(".search-con .results section").css({ paddingLeft: 0 })
    // };
  });

  $(document).on('input', '.search-con form input.tt-input', function (ev) {
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

  // $(window).resize(function() {
  //   if ($('.search-con .results').hasScrollBar()) {
  //     $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
  //   } else {
  //     $(".search-con .results section").css({ paddingLeft: 0 })
  //   };
  // });

  // menu nav docs
  $(window).on('scroll', function (ev) {
    toggleFixedNavigation(ev);
    toggleActiveSections(ev);
  });

  page('/docs/:document', function (ctx, next) {
    if ('providers' === ctx.params.document) return openSearch.call(document);
    closeSearch.call(document);
    var id = '#' + ctx.params.document;
    scrollToId(id);
  });
  page.start();
  // end menu nav docs

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
        $submenu.find('a').removeClass('active').closest('[data-content]').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        $submenu.find('a[href="/docs/' + $(this).attr('id') + '"]').addClass('active').closest('[data-content]').addClass('active');
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

    // accordion
    $('.accordion').accordion({
      "transitionSpeed": 400
    });

    // animate docs scroll
    if (/^\/docs\/./.test(window.location.pathname)) {
      var id = '#' + window.location.pathname.replace(/^\/docs\//, '');
      if ('#providers' === id) return openSearch.call(document);
      scrollToId(id);
    }
  }

  function sidebarToggle() {
    var $menu = $('#menu');
    var pathname = window.location.pathname;
    var base = '/' + pathname.split('/')[1];

    // reset active menu
    $menu.find('li.active').removeClass('active');

    // set current active menu
    $menu.find('a[href="' + base + '"]').parent('li').addClass('active');
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

  function openSearch() {
    // open search
    $("body").addClass("is-search");
    // focus input
    $(".search-con form input.tt-input").focus();
    // render results
    renderFeaturedStrategies();
  }

  function toggleResponsiveMenu(open) {
    $("html").toggleClass("is-menu", open);
    $(".content, .top-site").toggleClass('blured', open);
    $('.menu-trigger').toggleClass("is-active", open).next().toggleClass("is-active", open);
  }

  function renderFeaturedStrategies() {
    strategies.initPromise.done(loaded);
    function loaded() {
      var $featured = $.map(strategies.all().sort(sorter), templateItem);
      $('.search-con .results section').html($featured);
      $(".search-con .info-line span").text($featured.length);
    }
  }

  function templateItem(item) {
    return '<article' + (item.featured ? ' class="featured"' : '') + '><a href="'+ item.url +'" target="_blank"><span class="title">'+ item.label +'</span><span class="text">'+ item.desc +'</span>' + (item.featured ? '<span class="featured-flag">Featured</span>' : '') + '<span class="stat"><span class="download">'+ item.forks +'</span><span class="star">'+ item.stars +'</span></span></a></article>'
  }

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

  function scrollToId(id) {
    var scroll = $(id).offset().top - 30;
    $('html, body').animate({ scrollTop: scroll }, 500);
  }

});
