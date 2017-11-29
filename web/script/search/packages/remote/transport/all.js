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
  
  var loadPromise;
  
  function _loadRemote() {
    var deferred;
  }
  
  function remote(url) {
    console.log('-- initi remote');
    console.log(url);
    
    url = url || '/packages/-/v1/all.json';
    
    return $.ajax({ url: url, type: 'GET', dataType: 'json' })
      .then(function(data, textStatus, request) {
        console.log('done fetch');
        
        if (data.urls && data.urls.next) {
          console.log('need to fetch: ' + data.urls.next);
          return remote(data.urls.next)
        }
        
      });
  }
  
  
  var loadPromise;
  
  return function(options, onSuccess, onError) {
    console.log('REMOTE SEARCH!');
    console.log(options);
    console.log(onSuccess)
    console.log(onError)
    
    
    engine.initialize()
      .then(load)
      .done(function() {
        console.log('-- remote loaded');
        
        engine.search(options.query, function(datums) {
          //onSuccess(datums);
          
          console.log('GOT DATUMS');
          console.log(datums);
          
          onSuccess(datums);
        });
      })
      .fail(function(){});
    
    
    
    function _load(options) {
      return $.ajax(options).then(process);
      
      function process(data, textStatus, request) {
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
    
    return;
    
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
