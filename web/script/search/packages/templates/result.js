define(function() {
  
  return function(item) {
    return '<article' + (item.flags && (item.flags.featured || item.flags.sponsored) ? ' class="featured"' : '') + '><a href="'+ item.links.self +'" target="_blank"><span class="title">'+ item.name +'</span><span class="text">'+ item.description +'</span>' + (item.flags && (item.flags.featured || item.flags.sponsored) ? '<span class="featured-flag">Featured</span>' : '') + '<span class="stat"><span class="download">'+ (item.downloads ? (item.downloads['last-week'] || 0).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') : 0) +'</span><span class="star">'+ (item.counts ? (item.counts.bookmarks || 0) : 0) +'</span></span></a></article>'
  };
  
});
