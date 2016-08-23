define(['jquery', 'highlight', 'bloodhound', 'jquery.typeahead', './search', './docs', 'page'],
function($, hljs, Bloodhound, __$_typeahead, search, docs, page) {

  $(document).ready(function() {
    
    
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
  
  
  });

});
