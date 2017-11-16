define(['bloodhound', './packages/sort'], function(Bloodhound, sort) {
  
  /**
   * Strategies Search Engine initialization
   */
  var engine = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('label'),
    queryTokenizer: Bloodhound.tokenizers.nonword,
    sorter: sort,
    identify: function(item) {
      return item.label;
    },
    prefetch: {
      url: '/data.json',
      cache: false
    }
  });
  
  
  return engine;
  
});
