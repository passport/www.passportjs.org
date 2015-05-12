$(document).ready(function() {
  var $submenu, $gotop, submenuOffset, gotopOffset;
  var data = [];

  /**
   * highlight js configuration
   */

  hljs.configure({ classPrefix: '' });

  /**
   * PJAX configuration
   */

  $(document).pjax('a[data-pjax]', '#page-content', {
    fragment: '#page-content'
  });

  $(document).on('pjax:end', function () {
    sidebarToggle();
    initialize();
  });

  /**
   * Initialize page
   */

  initialize();

  /**
   * Load for remote Data only once
   */

  $.getJSON("https://api.github.com/repos/jaredhanson/passport", function(data) {
    $(".social .stat").text(numberWithCommas(data.stargazers_count));
  });

  $.getJSON("data.json", function(qdata) {
    data = qdata;
  });

  /**
   * Bind plugins and even handlers
   */

  $("body").toggleClass("ie", msieversion());

  $(".search-con form input").autocomplete({
    source: function( request, response ) {
      var matches = $.map( data, function(acItem) {
        if ( acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0 ) {
          return acItem;
        }
      });
      response(matches);
    },
    open: function( request, response ) {
      $(".results section").html("")
      $(".ui-autocomplete li").each(function(index) {
        var label = $(this).text();
        if (index == 0) {
          $(".search-con form .autocomplete").text(label);
        };
        var matches = $.map( data, function(acItem) {
          if ( acItem.label.toUpperCase().indexOf(label.toUpperCase()) === 0 ) {

            $(".results section").append('<article><a href="'+ acItem.url +'"><span class="title">'+ acItem.label +'</span><span class="text">'+ acItem.desc +'</span><span class="stat"><span class="download">'+ acItem.forks +'</span><span class="star">'+ acItem.stars +'</span></span></a></article>');
          }
        });

        $(".results section").each(function(){
          var numChilds = $("article").length;

          $(".search-con .info-line span").text(numChilds);
        });
      });
      if ($('.search-con .results').hasScrollBar()) {
        $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
      } else {
        $(".search-con .results section").css({ paddingLeft: 0 })
      };
    },
    search: function() {
      $(".results section").html("");
    }
  });

  $(document).on('change keyup paste', '.search-con form input', function() {
    $(".search-con form .autocomplete").text("");
  });

  $(document).on('change keyup paste', '.search-con form input, .search form input', function() {
    $(".search-con form .input").text($(this).val());
  });

  $(document).on('click', '.menu-trigger', function() {
    $("body").toggleClass("is-menu");
    $(".content, .top-site").toggleClass('blured');
    $(this).toggleClass("is-active").next().toggleClass("is-active");
    return false;
  });

  $(document).on('focus', '.search form input', function(){
    var val = $(this).val();
    $(".main-hold").addClass('blured');
    $("body").addClass("is-search");
    $(".search-con form input").val(val).focus();
    $(".search-con form input").val("");
    $(".search-con form input").val(val);
    $(".search-con form input").autocomplete("search");
  });

  $(document).on('click', '[data-search]', function() {
    var val = $(this).val();
    $(".main-hold").addClass('blured');
    $("body").addClass("is-search");
    $(".search-con form input").val(val).focus();
    $(".search-con form input").val("");
    $(".search-con form input").val(val);
    $(".search-con form input").autocomplete("search");

    return false;
  });

  $(document).on('click', '.search-con .close-ico', function() {
    $(".search form input").val("");
    $("body").removeClass("is-search");
    $(".main-hold").removeClass('blured');
    $(".search-con form .input").text('');
    $(".results section").html('');
    $(".search-con .info-line span").text('0');
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $(".search form input").val("");
      $("body").removeClass("is-search");
      $(".main-hold").removeClass('blured');
      $(".search-con form .input").text('');
      $(".results section").html('');
      $(".search-con .info-line span").text('0');
    }
  });

  $(document).on('focus', '[placeholder]', function () {
    var $input = $(this);
    if ($input.val() == $input.attr('placeholder')) {
      $input.val('').removeClass("placeholder");
    }
  });

  $(document).on('blur', '[placeholder]', function () {
    var $input = $(this);
    // if ($input.val() == '' || $input.val() == $input.attr('placeholder')) {
    //   $input.val($input.attr('placeholder')).addClass("placeholder");
    // }
  })

  // FIXME: should be re-evaluated on each pjax:end
  if ($('.search-con .results').hasScrollBar()) {
    $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
  };

  $(window).resize(function() {
    if ($('.search-con .results').hasScrollBar()) {
      $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    } else {
      $(".search-con .results section").css({ paddingLeft: 0 })
    };
  });

  // menu nav docs
  $(window).on('scroll', function (ev) {
    toggleFixedNavigation(ev);
    toggleActiveSections(ev);
  });

  $(document).on('click', '.sub-menu nav a', function (ev) {
    var $el = $(this);
    var id = $el.attr('href');

    $('html, body').animate({
      scrollTop: $(id).offset().top - 30
    }, 500);
  });
  // end menu nav docs

  /**
   * Contextual helpers
   * Depends on globally context variable values
   */

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
        $submenu.find('a').removeClass('active');
        sections.removeClass('active');

        $(this).addClass('active');
        $submenu.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
      }
    });
  }

  function initialize() {
    $submenu = $('.sub-menu nav');
    $gotop = $('.go-top');
    submenuOffset = $submenu.offset();
    gotopOffset = $gotop.offset();
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
  }

  function sidebarToggle() {
    var $menu = $('#menu');

    // reset active menu
    $menu.find('li.active').removeClass('active');

    // set current active menu
    $menu.find('a[href="' + window.location.pathname + '"]').parent('li').addClass('active');
  }
});
