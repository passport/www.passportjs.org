define(['jquery', 'page'],
function($, page) {
  
  // docs nav (doesnt yet expand accoridon?)
  $(window).on('scroll', function (ev) {
    toggleFixedNavigation(ev);
    toggleActiveSections(ev);
  });
  
  page('/docs/:document', function (ctx, next) {
    // FIXME: open search is undefined
    if ('providers' === ctx.params.document) return openSearch.call(document);
    closeSearch.call(document);
    var id = '#' + ctx.params.document;
    scrollToId(id);
  });
  page.start();
  
  function scrollToId(id) {
    var scroll = $(id).offset().top - 30;
    $('html, body').animate({ scrollTop: scroll }, 500);
  }
  
  /**
   * Contextual helpers
   * Depends on globally context variable values
   */
  
  $submenu = $('.sub-menu nav');
  $gotop = $('.go-top');
  submenuOffset = $submenu.offset();
  gotopOffset = $gotop.offset();

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
  // end docs
  
  
  // TODO: Factor this out of this file
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
  
});
