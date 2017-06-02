exports = module.exports = function(container) {
  var PouchDB = require('pouchdb');
  PouchDB.plugin(require('pouchdb-find'));
  
  
  var db = new PouchDB('my_database');
  return db;
};

exports['@implements'] = 'http://schemas.modulate.io/js/opt/pouchdb/Database';
exports['@singleton'] = true;
