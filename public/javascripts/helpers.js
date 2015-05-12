
function debounce (func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;
  function later() {
    var last = Date.now() - timestamp;
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function debounced() {
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

function getScrollbarWidth() {
  var div=$('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>');
  $('body').append(div);
  var w1=$('div',div).innerWidth();
  div.css('overflow-y','auto');
  var w2=$('div',div).innerWidth();
  $(div).remove();
  return(w1-w2);
}

function msieversion() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) return true;

 return false;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$.fn.hasScrollBar = function() {
  return this.get(0).scrollHeight > this.get(0).clientHeight;
};
