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

  $.getJSON('repo.json', function(data) {
    $(".social .stat").text(numberWithCommas(data.stargazers_count));
  });

  // $.getJSON("data.json", function(qdata) {
  //   data = qdata;
  // });

  /**
   * Bind plugins and even handlers
   */

  $("body").toggleClass("ie", msieversion());

  var strategies = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function(item) {
      return item.label;
    },
    prefetch: {
      url: 'data.json',
      cache: false
    }
  });

  // passing in `null` for the `options` arguments will result in the default
  // options being used
  $('.search-con form input').typeahead(null, {
    name: 'strategies',
    displayKey: 'label',
    source: strategies,
    templates: {
      suggestion: templateItem
    },
    classNames: {
      // 'selectable': 'selected'
    }
  });

  $('.search-con form input').bind('typeahead:render', function (ev) {
    var $results = $('.search-con .tt-menu .tt-dataset article').clone();
    $results.appendTo($('.search-con .results section').html(''));
    $(".search-con .info-line span").text($results.length);
  });

  $('.search-con form input').bind('typeahead:cursorchange', function (ev) {
    var $results = $('.search-con .tt-menu .tt-dataset article').clone();
    $results.appendTo($('.search-con .results section').html(''));
    $(".search-con .info-line span").text($results.length);
  });

  // $(".search-con form input").autocomplete({
  //   source: function( request, response ) {
  //     var matches = $.map( data, function(acItem) {
  //       if ( acItem.label.toUpperCase().indexOf(request.term.toUpperCase()) === 0 ) {
  //         return acItem;
  //       }
  //     });
  //     response(matches);
  //   },
  //   open: function( request, response ) {
  //     $(".results section").html("")
  //     $(".ui-autocomplete li").each(function(index) {
  //       var label = $(this).text();
  //       if (index == 0) {
  //         $(".search-con form .autocomplete").text(label);
  //       };
  //       var matches = $.map( data, function(acItem) {
  //         if ( acItem.label.toUpperCase().indexOf(label.toUpperCase()) === 0 ) {
  //           $(".results section").append(templateItem(acItem));
  //         }
  //       });
  //     });

  //     var numChilds = $(".results section article").length;
  //     $(".search-con .info-line span").text(numChilds);

  //     if ($('.search-con .results').hasScrollBar()) {
  //       $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
  //     } else {
  //       $(".search-con .results section").css({ paddingLeft: 0 })
  //     };
  //   },
  //   search: function() {
  //     $(".results section").html("");
  //   }
  // });

  function templateItem(item) {
    return '<article><a href="'+ item.url +'"><span class="title">'+ item.label +'</span><span class="text">'+ item.desc +'</span><span class="stat"><span class="download">'+ item.forks +'</span><span class="star">'+ item.stars +'</span></span></a></article>'
  }

  // $(document).on('change input paste', '.search-con form input', function() {
  //   $(".search-con form .autocomplete").text("");
  // });

  // $(document).on('change input paste', '.search-con form input, .search form input', function () {
  //   $(".search-con form .input").text($(this).val());
  // });

  $(document).on('click', '.menu-trigger', function() {
    $("body").toggleClass("is-menu");
    $(".content, .top-site").toggleClass('blured');
    $(this).toggleClass("is-active").next().toggleClass("is-active");
    return false;
  });

  $(document).on('focus', '.search form input', function(ev) {
    openSearch.call(this, ev);
  });

  $(document).on('click', '[data-search]', function(ev) {
    ev.preventDefault();
    openSearch.call(this, ev);
  });

  $(document).on('click', '.search-con .close-ico', function(ev) {
    closeSearch.call(this, ev);
  });

  $(document).keyup(function(ev) {
    if (ev.keyCode !== 27) { return; }
    closeSearch.call(this, ev);
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

  $(document).on('click', '.sub-menu nav a:not([data-search])', function (ev) {
    var $el = $(this);
    var id = $el.attr('href');
    var scroll = $(id).offset().top - 30;

    $('html, body').animate({ scrollTop: scroll }, 500);
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

  function closeSearch () {
    $(".search form input").val("");
    $("body").removeClass("is-search");
    $(".main-hold").removeClass('blured');
    $(".search-con form .input").text('');
    $(".results section").html('');
    $(".search-con .info-line span").text('0');
  }

  function openSearch() {
    var val = $(this).val();
    $(".main-hold").addClass('blured');
    $("body").addClass("is-search");
    $(".search-con form input").val(val).focus();
    // $(".search-con form input").autocomplete("search");
  }
});
