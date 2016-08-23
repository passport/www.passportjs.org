require.config({
  baseUrl: '/js/lib',
  paths: {
    'app': '../app',
    'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
    'highlight': '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/highlight.min',
    'bloodhound': '../jspm_packages/github/twitter/typeahead.js@0.11.1/dist/bloodhound',
    'page': '../jspm_packages/github/visionmedia/page.js@1.7.1/page',
    'jquery.pjax': '../jspm_packages/github/defunkt/jquery-pjax@1.9.6/jquery.pjax',
    'jquery.typeahead': '../jspm_packages/github/twitter/typeahead.js@0.11.1/dist/typeahead.jquery'
  },
  shim: {
    'jquery.pjax': ['jquery']
  }
});

require(['app/app']);
