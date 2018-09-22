define(function() {
  
  return function(item) {
    return '<article' + (item.flags && (item.flags.featured || item.flags.sponsored) ? ' class="featured"' : '') + '><span class="title">'+ item.name +'</span><span class="text">'+ item.description +'</span>' + (item.flags && (item.flags.featured || item.flags.sponsored) ? '<span class="featured-flag">Featured</span>' : '') + '</article>'
  };
  
});
