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
      url: '/packages/-/v1/promoted.json',
      transform: function(response) {
        var objects = response.objects
          , items = [], item
          , i, len;
        for (i = 0, len = objects.length; i < len; ++i) {
          item = objects[i].package;
          item.links = item.links || {};
          item.links.self = '/packages/' + encodeURIComponent(item.name);
          item.flags = objects[i].flags;
          item.count = objects[i].count;
          item.downloads = objects[i].downloads;
          items.push(item);
        }
        return items;
      },
      cache: false
    },
    remote: remote
  });
  
  
  return engine;
  
});
