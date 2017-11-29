define(function() {
  
  return function(item) {
    //console.log('SUGGEST!');
    //console.log(item);
    
    return '<article' + (item.featured ? ' class="featured"' : '') + '><a href="'+ item.url +'" target="_blank"><span class="title">'+ item.label +'</span><span class="text">'+ item.desc +'</span>' + (item.featured ? '<span class="featured-flag">Featured</span>' : '') + '</a></article>'
  };
  
});
