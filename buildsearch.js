var yaml = require('js-yaml');
var fs = require('fs');
var githubUrl = require('github-url-from-git');
var gh = require('github-url-to-object');
var request = require('request');
var NPMRegistry = require('npm-registry');

var npm = new NPMRegistry();


// TODO: Use something like this to programatically fetch all Passport strategies,
// rather than building a manual list.
// https://github.com/todvora/variety-plugins-searcher


try {
  var strategies = yaml.safeLoad(fs.readFileSync('strategies.yaml', 'utf8'));
  var data = [];

  var strategy
    , i = 0;
  
  (function iter(err) {
    if (err) {
      console.log(err);
      return;
    }
    
    strategy = strategies[i++];
    if (!strategy) {
      fs.writeFileSync('test.json', JSON.stringify(data, null, 2));
      return;
    }
    
    
    var url = githubUrl(strategy.repository);
    var obj = gh(url);
    
    var name = strategy.name || obj.repo;
    
    npm.packages.get(name, function (err, npmData) {
      if (err) { return iter(err); }
      
      var pkg = npmData[0];
    
      request.get(obj.api_url,
                  { headers: { 'User-Agent': 'node' }, json: true }, function (err, resp, json) {
        if (err) { return iter(err); }
        if (resp.statusCode !== 200) {
          console.log('Failed to fetch from GitHub: ' + obj.api_url);
          json = {};
        }
      
        data.push({
          label: obj.repo,
          desc: pkg.description,
          url: url,
          stars: json.stargazers_count,
          forks: json.forks_count
        });
        iter();
      });
    });
    
  })();
  
  
} catch (e) {
  console.log(e);
}
