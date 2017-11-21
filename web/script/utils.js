define(['exports'], function(exports) {
  
  exports.commaize = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  exports.isMSIE = function() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) return true;
    return false;
  };
  
});
