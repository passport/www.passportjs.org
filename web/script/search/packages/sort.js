define(function() {
  
  function favoriteCountSorter (a, b) {
    var afav = a.repository ? (a.repository.favoriteCount || 0) : 0;
    var bfav = b.repository ? (b.repository.favoriteCount || 0) : 0;
    
    if (afav && !bfav) return -1;
    if (bfav && !afav) return 1;
    return +bfav - (+afav);
  }

  function featuredSorter (a, b) {
    if (a._featured && !b._featured) return -1;
    if (b._featured && !a._featured) return 1;
    return 0;
  }

  function sorter (a, b) {
    var first = featuredSorter(a, b);
    if (first) return first;
    return favoriteCountSorter(a, b);
  }
  
  return sorter;
  
});
