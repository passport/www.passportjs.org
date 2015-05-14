// Builds the data.json for search.  Run as:
//   $ node buildsearch.js
//
// To increase rate limits for the GitHub API, run with a client ID and secret
//   $ GITHUB_CLIENT_ID=x GITHUB_CLIENT_SECRET=foo node buildsearch.js

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
      fs.writeFileSync('public/data.json', JSON.stringify(data, null, 2));
      return;
    }
    
    if (strategy.ignore) {
      return iter();
    }
    
    
    var name = strategy.name
      , url, obj;
    if (!name) {
      url = githubUrl(strategy.repository);
      obj = gh(url);
      name = obj.repo;
    }
    
    
    console.log('Fetching %s from npm...', name);
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
    
      
      // TODO: Better check for non-GitHub repos
      if (obj) {
        console.log('Fetching %s from GitHub...', name);
        var rurl = obj.api_url;
        
        if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
          rurl = rurl + '?client_id=' + process.env.GITHUB_CLIENT_ID + '&client_secret=' + process.env.GITHUB_CLIENT_SECRET;
        }
        
        request.get(rurl,
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
            forks: json.forks_count,
            featured: strategy.featured
          });
          iter();
        });
      } else if (strategy.repository) {
        data.push({
          label: name,
          desc: pkg.description,
          url: strategy.repository,
          featured: strategy.featured
        });
        iter();
      } else {
        return iter(new Error('No repository for: ' + name));
      }
    });
    
  })();
  
  
} catch (e) {
  console.log(e);
}
