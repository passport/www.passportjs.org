define(['exports',
        '../search/packages/templates/suggestion',
        '../search/packages/engine',
        'page',
        'jquery', 'jquery.typeahead'],
function(exports, template, engine, page, $, __$_typeahead) {
  
  $(document).ready(function() {
    
    $(document).on('focus', '#toolbar .toolbar-search form input', function(ev) {
      page.show('/packages/');
    });
    
    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('.search-con form input').typeahead(null, {
      name: 'packages',
      display: 'name',
      limit: Infinity,
      source: engine,
      templates: {
        suggestion: template
      }
    });
    
    $('.search-con form input').bind('typeahead:active', function(ev) {
      console.log('typeahead active');
    });
    
    $('.search-con form input').bind('typeahead:idle', function(ev) {
      console.log('typeahead idle');
    });
    
    $('.search-con form input').bind('typeahead:open', function(ev) {
      console.log('typeahead open');
    });
    
    $('.search-con form input').bind('typeahead:close', function(ev) {
      console.log('typeahead close');
    });
    
    $('.search-con form input').bind('typeahead:change', function(ev) {
      console.log('typeahead change');
    });
    
    $('.search-con form input').bind('typeahead:select', function(ev) {
      console.log('typeahead select');
    });
    
    $(document).on('focus', '[placeholder]', function () {
      if ($(this).val() == $(this).attr('placeholder')) {
        $(this).val('').removeClass('placeholder');
      }
    });
    
    // $(window).resize(function() {
    //   if ($('.search-con .results').hasScrollBar()) {
    //     $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    //   } else {
    //     $(".search-con .results section").css({ paddingLeft: 0 })
    //   };
    // });
    
  });
  
});
