define(['jquery', 'highlight', 'bloodhound', 'jquery.pjax', 'jquery.typeahead', './search', './docs', 'page'],
function($, hljs, Bloodhound, __$_pjax, __$_typeahead, search, docs, page) {

  $(document).ready(function() {
    var loadingTimeout = 0;
    
    search('.search-con');
    docs();

    $(document).on('click', '.menu-trigger', function(ev) {
      toggleResponsiveMenu();
      return false;
    });
    
    // NOTE: Handles strategies menu item
    $(document).on('click', '[data-search]', function(ev) {
      ev.preventDefault();
      
      $("body").addClass("is-search");
      // focus input
      $(".search-con form input.tt-input").focus();
    });

    // TODO: What is this?
    $(document).on('focus', '[placeholder]', function () {
      var $input = $(this);
      if ($input.val() == $input.attr('placeholder')) {
        $input.val('').removeClass("placeholder");
      }
    });
    
    
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
  
  
    /**
     * PJAX configuration
     */

    $(document).pjax('a[data-pjax]', '#page-content', {
      fragment: '#page-content',
      timeout: 1200
    });

    $(document).on('pjax:popstate', function () {
      // TODO:
      //closeSearch.call(document);
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
      // FIXME, clean this up and remove initialize
      initialize();
    });
    
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

      /*
      // accordion
      $('.accordion').accordion({
        "transitionSpeed": 400
      });
      */

      // animate docs scroll
      if (/^\/docs\/./.test(window.location.pathname)) {
        var id = '#' + window.location.pathname.replace(/^\/docs\//, '');
        if ('#providers' === id) return openSearch.call(document);
        scrollToId(id);
      }
    }
    
    function scrollToId(id) {
      var scroll = $(id).offset().top - 30;
      $('html, body').animate({ scrollTop: scroll }, 500);
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
    
    function toggleResponsiveMenu(open) {
      $("html").toggleClass("is-menu", open);
      $(".content, .top-site").toggleClass('blured', open);
      $('.menu-trigger').toggleClass("is-active", open).next().toggleClass("is-active", open);
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
  
  
  });

});
