define(['./controllers/home',
        './controllers/docs',
        './controllers/features',
        './controllers/packages',
        './middleware/controller',
        './middleware/ad/refresh',
        './shell',
        './utils',
        'page',
        'jquery'],
function(homeController, docsController, featuresController, packagesController,
         controller, adRefresh, shell, utils, page, $) {
  
  page('/', controller(homeController), adRefresh());
  page('/docs/*', controller(docsController), adRefresh());
  page('/features', controller(featuresController), adRefresh());
  page('/packages', controller(packagesController, true));
  
  
  $(document).ready(function() {
    $('body').toggleClass('ie', utils.isMSIE());
    
    page.start();
    
    $.getJSON('/repo.json', function(data) {
      $(".social .stat").text(utils.commaize(data.stargazers_count));
    });
  });
  
});
