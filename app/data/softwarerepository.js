exports = module.exports = function(db, logger) {
  var PouchDBSoftwareRepository = require('../../lib/data-software-pouchdb/softwarerepository');
  
  
  var repo = new PouchDBSoftwareRepository(db, logger);
  return repo;
};

exports['@implements'] = 'http://schemas.modulate.io/js/data/software/SoftwareRepository';
exports['@singleton'] = true;
exports['@require'] = [
  'http://schemas.modulate.io/js/opt/pouchdb/Database',
  'http://i.bixbyjs.org/Logger'
];
