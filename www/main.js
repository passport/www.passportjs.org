require.config({
  baseUrl: 'js/lib',
  paths: {
    'app': '../app',
    'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min',
    'highlight': '//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.5/highlight.min'
  }
});

require(['app/app']);
