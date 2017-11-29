define(['bloodhound', './sort', './remote/api-v1/all', 'jquery'], function(Bloodhound, sort, remote, $) {
  
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
    remote: remote
  });
  
  
  return engine;
  
});
