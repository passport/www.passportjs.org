define(['bloodhound', './sort', './remote/transport/all', 'jquery'], function(Bloodhound, sort, transport, $) {
  
  console.log(window.SearchIndex)
  
  /**
   * Strategies Search Engine initialization
   */
  var engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
    queryTokenizer: Bloodhound.tokenizers.nonword,
    sorter: sort,
    identify: function(item) {
      return item._id;
    },
    prefetch: {
      //url: '/data.json',
      url: '/packages/-/v1/feeds/featured.json',
      transform: function(response) {
        return response.objects;
      },
      cache: false
    },
    remote: {
      url: '/packages/-/v1/all.json',
      prepare: function(query, settings) {
        //console.log('PREPARE');
        //console.log(query);
        //console.log(settings);
        settings.query = query;
        
        //settings.url += '?q=' + query;
        return settings;
      },
      transport: transport,
      cache: false,
      _maxPendingRequests: 1
    }
  });
  
  
  return engine;
  
});
