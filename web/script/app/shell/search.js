define(['exports',
        '../search/packages/templates/suggestion',
        '../search/packages/engine',
        'jquery', 'jquery.typeahead'],
function(exports, template, engine, $, __$_typeahead) {
  
  $(document).ready(function() {
    
    // passing in `null` for the `options` arguments will result in the default
    // options being used
    $('.search-con form input').typeahead(null, {
      name: 'strategies',
      display: 'label',
      limit: Infinity,
      source: engine,
      templates: {
        suggestion: template
      }
    });
    
  });
  
});
