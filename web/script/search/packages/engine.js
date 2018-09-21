define(['bloodhound', './sort', './remote/api-v1/all'], function(Bloodhound, sort, remote) {
  
  /**
   * Strategies Search Engine initialization
   */
  var engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
    queryTokenizer: Bloodhound.tokenizers.nonword,
    sorter: sort,
    identify: function(item) {
      return item.name;
    },
    prefetch: {
      url: '/packages/-/v1/feeds/featured.json',
      transform: function(response) {
        var objects = response.objects
          , i, len;
        for (i = 0, len = objects.length; i < len; ++i) {
          objects[i]._featured = true;
        }
        return objects;
      },
      cache: false
    },
    remote: remote
  });
  
  
  return engine;
  
});
