define(function() {
  
  return function(item) {
    //console.log('RESULT');
    //console.log(item);
    
    return '<article' + (item.featured ? ' class="featured"' : '') + '><a href="'+ item.url +'" target="_blank"><span class="title">'+ item.name +'</span><span class="text">'+ item.description +'</span>' + (item.featured ? '<span class="featured-flag">Featured</span>' : '') + '<span class="stat"><span class="download">'+ item.forks +'</span><span class="star">'+ item.stars +'</span></span></a></article>'
  };
  
});
