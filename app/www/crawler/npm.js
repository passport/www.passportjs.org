exports = module.exports = function(versionRepo) {
  var clone = require('clone')
    , deepEqual = require('deep-equal');
  
  
  return function npmPackage(res, req, ctx) {
    console.log('PROCESS NPM PACKAGE?');
    //console.log(req);
    console.log(res.body);
    
    var versions = Object.keys(res.body.versions)
      , version, pkg, obj
      , i = 0;
    console.log(versions);
    //var releases = res.body.versions;
    
    (function iter(err) {
      var pkg;
      
      
      version = versions[i++];
      if (!version) {
        console.log('DONE!');
      }
      
      console.log('DO VER');
      console.log(version)
      
      
      pkg = res.body.versions[version];
      console.log(pkg);
      
      
      versionRepo.query(pkg.dist.tarball, function(err, rec) {
        console.log('QUERY')
        console.log(err);
        console.log(rec);
        
        if (Array.isArray(rec)) {
          rec = rec[0];
        }
        
        var op = 'update'
          , obj;
        
        if (!rec) {
          obj = {};
          op = 'create';
        } else {
          obj = clone(rec);
        }
        
        obj.version = pkg.version;
        obj.downloadUrl = pkg.dist.tarball;
        
        if (deepEqual(obj, rec)) {
          console.log('DEEP EQUAL!')
          return;
        }
        
        versionRepo[op](obj, function(err, rec) {
          console.log('PERSISTED! ' + op);
          console.log(err);
          console.log(rec);
        });
      })
      
      /*
      function proceed(err, rec) {
        
      }
      */
      
      /*
      versionRepo.create(obj, function(err, rec) {
        console.log(err);
        console.log(rec);
      });
      */
    })();
  };
};

exports['@require'] = [
  'http://schemas.modulate.io/js/data/software/0/VersionRepository'
];
