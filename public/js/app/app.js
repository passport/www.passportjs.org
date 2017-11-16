define(['page', './pages/home', './pages/docs', './pages/packages', './pages/features', './search/packages', './search/packages/templates/suggestion', 'jquery', 'jquery.pjax', 'jquery.typeahead'],
function(page, homeRoute, docsRoute, packagesRoute, featuresRoute, searchEngine, searchTemplate, $, __$_pjax, __$_typeahead) {
  
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
      toggleResponsiveMenu(false);
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
      source: searchEngine,
      templates: {
        suggestion: searchTemplate
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
      page.show('/packages/');
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
    
    /*
    window.addEventListener('popstate', function(e){
      console.log('^^^ ON POP STATE');
      console.log(e.state);
    }, false);
    */
    
    function reinit(ctx, next) {
      initialize();
    }
    
    
    page.apply(page, ['/'].concat(homeRoute).concat([reinit]));
    
    
    function reinitDocs(ctx, next) {
      scrollToId(ctx.locals.id);
      initialize();
    }
    
    page.apply(page, ['/docs/:slug?'].concat(docsRoute).concat([reinitDocs]));
    
    page.apply(page, ['/packages'].concat(packagesRoute.enter));
    page.exit.apply(page, ['/packages'].concat(packagesRoute.exit));
    
    page.apply(page, ['/features'].concat(featuresRoute).concat([reinit]));
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
      
      // accordion
      // XXX
      /*
      $('.accordion').accordion({
        "transitionSpeed": 400
      });
      */
    }

    function toggleResponsiveMenu(open) {
      $("html").toggleClass("is-menu", open);
      $(".content, .top-site").toggleClass('blured', open);
      $('.menu-trigger').toggleClass("is-active", open).next().toggleClass("is-active", open);
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
