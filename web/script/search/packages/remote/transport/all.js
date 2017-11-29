define(['bloodhound', '../../sort', 'jquery'], function(Bloodhound, sort, $) {
  
  console.log(window.SearchIndex)
  
  var engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
    queryTokenizer: Bloodhound.tokenizers.nonword,
    sorter: sort,
    identify: function(item) {
      return item._id;
    }
  });
  
  
  var loadPromise;
  
  return function(options, onSuccess, onError) {
    console.log('REMOTE SEARCH!');
    console.log(options);
    console.log(onSuccess)
    console.log(onError)
    
    
    engine.initialize()
      .then(load)
      .done(search)
      .fail(function(){});
    
    
    
    function _load(options) {
      return $.ajax(options).then(process);
      
      function process(data, textStatus, request) {
        engine.add(data.objects);
        
        if (data.urls && data.urls.next) {
          options.url = data.urls.next;
          return _load(options);
        }
      }
    }
    
    function load() {
      loadPromise = loadPromise || _load(options);
      return loadPromise;
    }
    
    function search() {
      engine.search(options.query, function(datums) {
        console.log('GOT DATUMS');
        console.log(datums);
        
        onSuccess(datums);
      });
    }
  };
  
});
