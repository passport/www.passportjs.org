define(['bloodhound', '../../sort', 'jquery'], function(Bloodhound, sort, $) {
  
  var engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
    queryTokenizer: Bloodhound.tokenizers.nonword,
    sorter: sort,
    identify: function(item) {
      return item.name;
    }
  });
  var loadPromise;
  
  
  return {
    url: '/packages/-/v1/all.json',
    prepare: function(query, settings) {
      settings.query = query;
      return settings;
    },
    transport: function(options, onSuccess, onError) {
      engine.initialize()
        .then(load)
        .done(search)
        .fail(function(){});
    
    
      function _load(options) {
        return $.ajax(options).then(process);
      
        function process(data, textStatus, request) {
          var objects = data.objects
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
          engine.add(items);
        
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
          onSuccess(datums);
        });
      }
    },
    cache: false,
    rateLimitWait: 0
  };
  
});
