require.config({
  paths: {
    'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min',
    'jquery.pjax': '//cdnjs.cloudflare.com/ajax/libs/jquery.pjax/2.0.1/jquery.pjax.min',
    'jquery.typeahead': '//cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/1.2.1/typeahead.jquery.min',
    'bloodhound': '//cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/1.2.1/bloodhound.min',
    'highlight': '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min',
    'page': '//cdnjs.cloudflare.com/ajax/libs/page.js/1.7.1/page.min'
  },
  packages: [
    { name: 'class', main: 'class', location: '../node_modules/class' },
    { name: 'events', location: '../node_modules/events' }
  ],
  shim: {
    'jquery.pjax': ['jquery']
  }
});

require(['app']);
