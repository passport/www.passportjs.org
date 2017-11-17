define(['page',
        './pages/home',
        './pages/docs',
        './pages/packages',
        './pages/features',
        './search/packages/engine',
        './search/packages/templates/suggestion',
        './shell',
        'jquery', 'jquery.pjax', 'jquery.typeahead'],
function(page, homeRoute, docsRoute, packagesRoute, featuresRoute, searchEngine, searchTemplate, shell,
         $, __$_pjax, __$_typeahead) {
  
  // static
  var _gotopOffset;
  var _submenuOffset;
  
  function _trackLayout() {
    _gotopOffset = $('.go-top').offset();
    _submenuOffset = $('.sub-menu nav').offset();
  }
  
  
  // ----------------------------------------------------------------------
  // Routing
  // ----------------------------------------------------------------------
  function _page_closeMenu(ctx, next) {
    shell.menu.close();
    next();
  }
  
  function _page_trackLayout(ctx, next) {
    _trackLayout();
    next();
  }
  
  page('*', _page_closeMenu);
  // /
  page.apply(page, ['/'].concat(homeRoute).concat([_page_trackLayout]));
  // /docs
  page.apply(page, ['/docs/:slug?'].concat(docsRoute).concat([_page_trackLayout]));
  // /packages
  page.apply(page, ['/packages'].concat(packagesRoute.enter));
  page.exit.apply(page, ['/packages'].concat(packagesRoute.exit));
  // /features
  page.apply(page, ['/features'].concat(featuresRoute).concat([_page_trackLayout]));
  
  page.start();
  // ----------------------------------------------------------------------
  
  
  $(document).ready(function() {
    console.log('APP READY!');
    
    _trackLayout();
    
    
    $(window).on('scroll', function (ev) {
      // toggleFixedNavigation
      $('.go-top').toggleClass('fixed', _gotopOffset && _gotopOffset.top < $(window).scrollTop());
      $('.sub-menu nav').toggleClass('fixed', _submenuOffset && _submenuOffset.top < $(window).scrollTop());
    });
    
    // ----------------------------------------------------------------------
    // Menu
    // ----------------------------------------------------------------------
    $(document).on('click', '.menu-trigger', function(ev) {
      shell.menu.toggle();
      return false;
    });
    
    // ----------------------------------------------------------------------
    // Search
    // ----------------------------------------------------------------------
    $(document).on('focus', '.search form input', function(ev) {
      page.show('/packages/');
    });
    
    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('.search-con form input').typeahead(null, {
      name: 'strategies',
      display: 'label',
      limit: Infinity,
      source: searchEngine,
      templates: {
        suggestion: searchTemplate
      }
    });
    
    $(document).on('focus', '[placeholder]', function () {
      if ($(this).val() == $(this).attr('placeholder')) {
        $(this).val('').removeClass('placeholder');
      }
    });
    
    // ----------------------------------------------------------------------
    // Navigation
    // ----------------------------------------------------------------------
    $(document).on('click', 'a[href="#top"]', function(ev) {
      shell.scrollToElementById('top');
      return false;
    });
    
    
    $.getJSON('/repo.json', function(data) {
      $(".social .stat").text(numberWithCommas(data.stargazers_count));
    });
  });
  
  
  
  $(document).ready(function() {
    var $submenu, $gotop, submenuOffset, gotopOffset;
    var data = [];
    var loadingTimeout = 0;

    /**
     * PJAX configuration
     */
    $(document).on('pjax:click', function () {
      console.log('pjax:click');
      togglePjaxLoading(true);
    });

    $(document).on('pjax:beforeReplace', function () {
      console.log('pjax:beforeReplace');
      togglePjaxLoading(false);
    });

    /**
     * Initialize page
     */

    initialize();

    /**
     * Bind plugins and even handlers
     */

    $("body").toggleClass("ie", msieversion());

    // $(window).resize(function() {
    //   if ($('.search-con .results').hasScrollBar()) {
    //     $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    //   } else {
    //     $(".search-con .results section").css({ paddingLeft: 0 })
    //   };
    // });

    // menu nav docs
    $(window).on('scroll', function (ev) {
      //toggleFixedNavigation(ev);
    });

    /**
     * Contextual helpers
     * Depends on globally context variable values
     */

    function toggleFixedNavigation(ev) {
      $submenu.toggleClass('fixed', submenuOffset && submenuOffset.top < $(window).scrollTop());
      $gotop.toggleClass('fixed', gotopOffset && gotopOffset.top < $(window).scrollTop());
    }

    function initialize() {
      // reset containers
      $submenu = $('.sub-menu nav');
      $gotop = $('.go-top');
      submenuOffset = $submenu.offset();
      gotopOffset = $gotop.offset();
      
      // accordion
      // XXX
      /*
      $('.accordion').accordion({
        "transitionSpeed": 400
      });
      */
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
  
  
  // helpers
  
  function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) return true;

   return false;
  }
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
});
