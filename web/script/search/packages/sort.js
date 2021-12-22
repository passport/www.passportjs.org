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
  
  function downloadCountSorter (a, b) {
    var adc = a.downloads ? (a.downloads['last-week'] || 0) : 0;
    var bdc = b.downloads ? (b.downloads['last-week'] || 0) : 0;
    
    if (adc && !bdc) return -1;
    if (bdc && !adc) return 1;
    return +bdc - (+adc);
  }
  
  function bookmarkCountSorter (a, b) {
    var afc = a.counts ? (a.counts.bookmarks || 0) : 0;
    var bfc = b.counts ? (b.counts.bookmarks || 0) : 0;
    
    if (afc && !bfc) return -1;
    if (bfc && !afc) return 1;
    return +bfc - (+afc);
  }

  function sorter (a, b) {
    var rv = featuredSorter(a, b);
    if (rv) return rv;
    rv = sponsoredSorter(a, b);
    if (rv) return rv;
    rv = downloadCountSorter(a, b);
    if (rv) return rv;
    return bookmarkCountSorter(a, b);
  }
  
  return sorter;
  
});
