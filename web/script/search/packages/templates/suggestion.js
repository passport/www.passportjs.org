define(function() {
  
  return function(item) {
    return '<article' + (item._featured ? ' class="featured"' : '') + '><span class="title">'+ item.name +'</span><span class="text">'+ item.description +'</span>' + (item._featured ? '<span class="featured-flag">Featured</span>' : '') + '</article>'
  };
  
});
