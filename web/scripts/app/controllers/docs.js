define(['./base',
        'class',
        'highlight',
        'jquery', 'jquery.pjax'],
function(Controller, clazz, hljs, $, __$_pjax) {
  
  // static
  function onscroll(ev) {
    // toggle active section
    var submenu = $('.sub-menu nav');
    var sections = $('.entry section');
    var cur_pos = $(window).scrollTop();

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
    Controller.call(this, '/docs');
    
    this.on('ready', function() {
      $(window).on('scroll', onscroll);
      
      hljs.configure({ classPrefix: '' });
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });
  }
  clazz.inherits(DocsController, Controller);
  
  DocsController.prototype.load = function() {
    var self = this;
    $.pjax({ url: '/docs/', fragment: '#page-content', container: '#page-content', push: false })
      .done(function(data) {
        self.emit('ready');
      });
  };
  
  DocsController.prototype.unload = function() {
    $(window).off('scroll', onscroll);
  }
  
  DocsController.prototype.scrollTo = function(slug) {
    if (!slug) { return; }
    this.shell.scrollToElementById(slug);
  };
  
  
  return new DocsController();
  
});
