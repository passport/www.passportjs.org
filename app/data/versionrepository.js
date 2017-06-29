exports = module.exports = function(db, logger) {
  var PouchDBVersionRepository = require('../../lib/data-software-pouchdb/versionrepository');
  
  
  var repo = new PouchDBVersionRepository(db, logger);
  return repo;
};

exports['@implements'] = 'http://schemas.modulate.io/js/data/software/0/VersionRepository';
exports['@singleton'] = true;
exports['@require'] = [
  'http://schemas.modulate.io/js/opt/pouchdb/Database',
  'http://i.bixbyjs.org/Logger'
];
