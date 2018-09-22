define(function() {
  
  function featuredSorter (a, b) {
    var af = a.flags && a.flags.featured;
    var bf = b.flags && b.flags.featured;
    
    if (af && !bf) return -1;
    if (bf && !af) return 1;
    return 0;
  }
  
  function sponsoredSorter (a, b) {
    var af = a.flags && a.flags.sponsored;
    var bf = b.flags && b.flags.sponsored;
    
    if (af && !bf) return -1;
    if (bf && !af) return 1;
    return 0;
  }
  
  function favoriteCountSorter (a, b) {
    var afc = a.count ? (a.count.favorites || 0) : 0;
    var bfc = b.count ? (b.count.favorites || 0) : 0;
    
    if (afc && !bfc) return -1;
    if (bfc && !afc) return 1;
    return +bfc - (+afc);
  }

  function sorter (a, b) {
    var rv = featuredSorter(a, b);
    if (rv) return rv;
    rv = sponsoredSorter(a, b);
    if (rv) return rv;
    return favoriteCountSorter(a, b);
  }
  
  return sorter;
  
});
