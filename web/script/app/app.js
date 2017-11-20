define(['page',
        './pages/home',
        './pages/docs',
        './pages/packages',
        './pages/features',
        './shell',
        'jquery'],
function(page, homeRoute, docsRoute, packagesRoute, featuresRoute, shell,
         $) {
  
  // ----------------------------------------------------------------------
  // Routing
  // ----------------------------------------------------------------------
  function _page_closeMenu(ctx, next) {
    shell.menu.close();
    next();
  }
  
  function _page_trackLayout(ctx, next) {
    shell.trackLayout();
    next();
  }
  
  page('*', _page_closeMenu);
  // /
  page.apply(page, ['/'].concat(homeRoute).concat([_page_trackLayout]));
  // /docs
  page.apply(page, ['/docs/:slug?'].concat(docsRoute).concat([_page_trackLayout]));
  // /packages
  page.apply(page, ['/packages'].concat(packagesRoute.enter));
  page.exit.apply(page, ['/packages'].concat(packagesRoute.exit));
  // /features
  page.apply(page, ['/features'].concat(featuresRoute).concat([_page_trackLayout]));
  
  page.start();
  // ----------------------------------------------------------------------
  
  
  $(document).ready(function() {
    $.getJSON('/repo.json', function(data) {
      $(".social .stat").text(numberWithCommas(data.stargazers_count));
    });
  });
  
  
  
  $(document).ready(function() {
    


    /**
     * Bind plugins and even handlers
     */

    $("body").toggleClass("ie", msieversion());

    // $(window).resize(function() {
    //   if ($('.search-con .results').hasScrollBar()) {
    //     $(".search-con .results section").css({ paddingLeft: getScrollbarWidth() })
    //   } else {
    //     $(".search-con .results section").css({ paddingLeft: 0 })
    //   };
    // });

  });
  
  
  // helpers
  
  function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) return true;

   return false;
  }
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
});
