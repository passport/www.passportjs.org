define(['jquery', 'highlight'],
function($, hljs) {

  $(document).ready(function() {
    
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
