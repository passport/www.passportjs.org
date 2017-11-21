define(['./base/pjax',
        'class',
        'highlight',
        'jquery'],
function(PjaxController, clazz, hljs, $) {
  
  // static
  var _submenuOffset;
  
  function onscroll(ev) {
    // toggle active section
    var submenu = $('.sub-menu nav');
    var sections = $('.entry section');
    var cur_pos = $(window).scrollTop();

    // toggleFixedNavigation
    submenu.toggleClass('fixed', _submenuOffset && _submenuOffset.top < $(window).scrollTop());

    sections.each(function() {
      var top = $(this).offset().top - 50;
      var bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        submenu.find('a').removeClass('active').closest('[data-content]').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        submenu.find('a[href="/docs/' + $(this).attr('id') + '"]').addClass('active').closest('[data-content]').addClass('active');
      }
    });
  }
  
  
  function DocsController() {
    PjaxController.call(this, '/docs', '/docs/downloads/html/');
    
    this.on('ready', function() {
      _submenuOffset = $('.sub-menu nav').offset();
      
      $(window).on('scroll', onscroll);
      
      if (window.matchMedia && window.matchMedia('screen and (min-width: 992px) and (max-height: 750px)')) {
        $('.sub-menu [data-accordion] [data-content]').css({
          'max-height': '0px',
          'overflow': 'hidden'
        });
        
        $('.sub-menu [data-accordion] [data-content] .active').closest('[data-content]').css({
          'max-height': '100%',
          'overflow': 'visible'
        });
      }
      
      // accordion
      /*
      $('.accordion').accordion({
        "transitionSpeed": 400
      });
      */
      
      hljs.configure({ classPrefix: '' });
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });
  }
  clazz.inherits(DocsController, PjaxController);
  
  DocsController.prototype.unload = function() {
    $(window).off('scroll', onscroll);
  }
  
  DocsController.prototype.dispatch = function(ctx, done) {
    var slug = ctx.params.slug;
    if (slug) {
      this.shell.scrollToElementById(slug);
    }
    ctx.handled = true;
    done();
  }
  
  
  return new DocsController();
  
});
