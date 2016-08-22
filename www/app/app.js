define(['jquery', 'highlight', 'bloodhound', 'jquery.typeahead', './search', './docs', 'page'],
function($, hljs, Bloodhound, __$_typeahead, search, docs, page) {

  $(document).ready(function() {
    
    
    search('.search-con');
    docs();
    
    $(document).on('click', '.go-top', function(ev) {
      scrollToId('#top');
      return false;
    });

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

    $(document).on('click', '.search-con .close-ico', function(ev) {
      closeSearch.call(this, ev);
    });

    $(document).keyup(function(ev) {
      if (ev.keyCode == 27) {
        closeSearch.call(this, ev);
      }
    });

    $(document).on('focus', '[placeholder]', function () {
      var $input = $(this);
      if ($input.val() == $input.attr('placeholder')) {
        $input.val('').removeClass("placeholder");
      }
    });
    
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
