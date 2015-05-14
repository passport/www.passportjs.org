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
    
    
    var name = strategy.name
      , url, obj;
    if (!name) {
      url = githubUrl(strategy.repository);
      obj = gh(url);
      name = obj.repo;
    }
    
    
    npm.packages.get(name, function (err, npmData) {
      if (err) { return iter(err); }
      
      var url, obj;
      
      var pkg = npmData[0];
      if (strategy.repository) {
        url = githubUrl(strategy.repository);
        obj = gh(url);
      } else if (pkg.repository) {
        if (typeof pkg.repository == 'string') {
          url = githubUrl(pkg.repository);
          obj = gh(url);
        } else {
          url = githubUrl(pkg.repository.url);
          obj = gh(url);
        }
      } else {
        // no repository, skip
        return iter();
      }
    
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
