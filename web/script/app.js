define(['./controllers/home',
        './controllers/docs',
        './controllers/features',
        './controllers/packages',
        './middleware/controller',
        './middleware/highlight',
        './middleware/analytics/pageview',
        './middleware/ad/refresh',
        './shell',
        './utils',
        'page',
        'jquery'],
function(homeController, docsController, featuresController, packagesController,
         controller, highlight, pageview, adRefresh, shell, utils, page, $) {
  
  page('/', controller(homeController), pageview(), adRefresh());
  page('/concepts/authentication/*', controller(docsController), pageview(), adRefresh());
  //page('/concepts/oauth2/*', highlight());
  //page('/tutorials/*', highlight());
  //page('/howtos/*', highlight());
  page('/features', controller(featuresController), pageview(), adRefresh());
  page('/packages', controller(packagesController, true), pageview());
  
  $(document).ready(function() {
    $('body').toggleClass('ie', utils.isMSIE());
    
    page.start();
    
    $.getJSON('/repo.json', function(data) {
      $('#toolbar .github .count').text(utils.commaize(data.stargazers_count));
    });
  });
  
});
