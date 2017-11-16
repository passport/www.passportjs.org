require.config({
  baseUrl: '/js/lib',
  paths: {
    'app': '../app',
    'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min',
    'bloodhound': '//cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/1.2.1/bloodhound.min',
    'highlight': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min',
    'jquery.pjax': '//cdnjs.cloudflare.com/ajax/libs/jquery.pjax/2.0.1/jquery.pjax.min',
    'jquery.typeahead': '//cdnjs.cloudflare.com/ajax/libs/corejs-typeahead/1.2.1/typeahead.jquery',
    'page': '//cdnjs.cloudflare.com/ajax/libs/page.js/1.7.1/page'
  },
  shim: {
    'jquery.pjax': ['jquery']
  }
});

require(['app/app']);
