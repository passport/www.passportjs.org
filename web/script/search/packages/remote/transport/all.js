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
  
  
  var _fetched = false;
  
  return function(options, onSuccess, onError) {
    console.log('REMOTE SEARCH!');
    console.log(options);
    //return;
    
    //console.log('TRANSPORT!');
    //console.log(options);
    
    //var objects = [];
    
    if (_fetched) { return search(options.query); }
    
    engine.initialize()
      .done(function() {
        console.log('ENGINE INITIALIZED');
        fetch(options.url);
      });
    
    //fetch(options.url);
    
    function search(query) {
      engine.search(options.query,
        function(datums) {
          onSuccess(datums);
        });
    }
    
    function fetch(url) {
      var opts = { url: url, type: 'GET', dataType: 'json' };
      
      $.ajax(opts)
        .done(function(data, textStatus, request) {
          //console.log('DONE!');
          //console.log(textStatus);
          //console.log(data)
          
          engine.add(data.objects);
          
          //objects = objects.concat(data.objects);
          if (data.urls && data.urls.next) {
            fetch(data.urls.next);
          } else {
            //console.log('GOT EM ALL!');
            //console.log(objects.length);
            //onSuccess(objects);
            
            _fetched = true;
            search(options.query);
          }
          
          //onSuccess(data);
        })
        .fail(function(request, textStatus, errorThrown) { onError(errorThrown); });
    }
    
  };
  
});
