define(['../shell', 'highlight', 'jquery', 'jquery.pjax', 'exports'], function(shell, hljs, $, __$_pjax, exports) {
  
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
  
  
  exports.basePath = '/docs/';
  
  exports.load = function(cb) {
    $.pjax({ url: '/docs/', fragment: '#page-content', container: '#page-content', push: false })
      .done(function(data) {
        cb();
      });
  };
  
  exports.scrollTo = function(id) {
    if (!id) { return; }
    shell.scrollToElementById(id);
  };
  
  exports.ready = function() {
    $(window).on('scroll', onscroll);
    
    hljs.configure({ classPrefix: '' });
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  };
  
  exports.unload = function() {
    $(window).off('scroll', onscroll);
  };
  
});
