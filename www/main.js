require.config({
  baseUrl: 'js/lib',
  paths: {
    'app': '../app',
    'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min'
  }
});

require(['app/app']);
