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
      var path = $(this).attr('id') + '/';

      if (cur_pos >= top && cur_pos <= bottom) {
        submenu.find('a').removeClass('active').closest('[data-content]').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        submenu.find('a[href="/docs/' + path + '"]').addClass('active').closest('[data-content]').addClass('active');
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
    if (ctx.init) {
      ctx.handled = true;
      return done();
    }
    
    var path = ctx.params[0];
    if (path[path.length - 1] == '/') { path = path.slice(0, -1); }
    
    var id = path || 'README'; // TODO: id-ify the path
    var el = $('#'+id);
    if (el.length) {
      this.shell.scrollToElementById(id);
      ctx.handled = true;
      return done();
    }
    
    // XXX: workaround to prevent `jquery-pjax` from replacing state, and
    //      wreaking havoc with page's popstate handler.
    $.pjax.state = window.history.state;
    
    var self = this;
    $.pjax({ url: this.canonicalPath, container: '.chapter', fragment: '.chapter', push: false })
      .done(function(data) {
        hljs.configure({ classPrefix: '' });
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
        
        self.shell.scrollToElementById(id, false);
        ctx.handled = true;
        done();
      });
  }
  
  
  return new DocsController();
  
});
