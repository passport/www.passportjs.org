define(['jquery', 'page'],
function($, page) {
  
  var $toc, $section;
  
  
  function visibleSection() {
    var offset = $('.guides section').first().offset();
    var x = offset.left;
    var y = offset.top - $(window).scrollTop();
    
    var el = document.elementFromPoint(x, (y < 0 ? 0 : y));
    var s = $(el).closest('section');
    if (s.length) {
      return s;
    }
  }
  
  
  
  
  
  
  return function() {
    function onscroll(ev) {
      toggleFixedNavigation(ev);
      //toggleActiveSections(ev);
    
      //console.log('SCROLL!');
    
      var sections = $('.entry section');
    
    
      var s = visibleSection();
      if (s) {
        console.log('VISIBLE SECTION IS!');
        console.log('ATS: ' + s.attr('id'));
        
        $toc.find('a').removeClass('active').closest('[data-content]').removeClass('active');
        sections.removeClass('active');
      
        s.addClass('active');
        $toc.find('a[href="/docs/' + s.attr('id') + '"]').addClass('active').closest('[data-content]').addClass('active');
      }
    
    }
    
    
    
    $(document).ready(function() {
      toggleFixedNavigation();
      
      console.log('DOCS READY! ' + $(window).scrollTop());
      
      
      $toc = $('.sub-menu nav');
      //$toc.find('a').removeClass('active').closest('[data-content]').removeClass('active');
      
      //$toc.find('a').removeClass('active');
      
      
      var s = visibleSection();
      if (s) {
        //console.log('VISIBLE SECTION IS!');
        console.log('AT: ' + s.attr('id'));
      }
      
    });
    
    
  // docs nav (doesnt yet expand accoridon?)
  $(window).on('scroll', function (ev) {
    onscroll(ev);
    
    return;
    
    // toggle active sections
    var sections = $('.entry section');
    var submenu_height = $submenu.outerHeight();
    var cur_pos = $(window).scrollTop();
    
    //console.log('submenu_height: ' + submenu_height);
    //console.log('cur_pos: ' + cur_pos);
    
    sections.each(function() {
      var top = $(this).offset().top - 50;  // WTF: magic number?
      var bottom = top + $(this).outerHeight();

      //console.log($(this).attr('id'));

      if (cur_pos >= top && cur_pos <= bottom) {
        console.log('DO IT: ' + $(this).attr('id'));
        //$submenu.find('a').removeClass('active').closest('[data-content]').removeClass('active');
        //sections.removeClass('active');

        //$(this).addClass('active');
        //$submenu.find('a[href="/docs/' + $(this).attr('id') + '"]').addClass('active').closest('[data-content]').addClass('active');
      }
    });
    
  });
  
  $(document).on('click', '.go-top', function(ev) {
    console.log('scroll top');
    scrollToId('#top');
    return false;
  });
  
  
  $(document).on('click', '.sub-menu a', function(ev) {
    console.log('submenu click');
    console.log(ev.currentTarget);
    console.log(ev.currentTarget.href)
    return false;
    
    var container = $('#replace')
    
    //$.pjax.click(ev, {container: container})
    $.pjax.click(ev, {container: container })
    return false;
    
   // var id = '#' + ctx.params.document;
    //var id = 'facebook';
    //scrollToId(id);
    //return false;
  });
  
  /*
  page('/docs/:document', function (ctx, next) {
    // FIXME: open search is undefined
    if ('providers' === ctx.params.document) return openSearch.call(document);
    closeSearch.call(document);
    var id = '#' + ctx.params.document;
    scrollToId(id);
  });
  page.start();
  */
  
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
  
  }
  
});
