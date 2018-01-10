define(function() {
  
  return function(item) {
    return '<article' + (item._featured ? ' class="featured"' : '') + '><a href="'+ item.homepage +'" target="_blank"><span class="title">'+ item.name +'</span><span class="text">'+ item.description +'</span>' + (item._featured ? '<span class="featured-flag">Featured</span>' : '') + '<span class="stat"><span class="download">'+ (item.downloads ? (item.downloads['last-week'] || 0).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') : 0) +'</span><span class="star">'+ (item.repository ? (item.repository.favoriteCount || 0) : 0) +'</span></span></a></article>'
  };
  
});
