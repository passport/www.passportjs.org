var uuid = require('uuid/v1');


function PouchDBSoftwareRepository(db, logger) {
  this._db = db;
  this._logger = logger;
  this._type = 'Project';
}

PouchDBSoftwareRepository.prototype.create = function(obj, cb) {
  obj['@type'] = this._type;
  obj._id = uuid();
  
  this._db.put(obj, function(err, result) {
    if (err) { return cb(err); }
    obj._rev = result.rev;
    return cb(null, obj);
  });
}

PouchDBSoftwareRepository.prototype.get = function(id, cb) {
  /*
  this._db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    if (err) { return next(err); }
    console.log(doc.rows);
    cb();
  });
  */
}

PouchDBSoftwareRepository.prototype.query = function(q, cb) {
  var request = {
    selector: { name: q }
  }
  
  var self = this;
  this._db.find(request, function(err, result) {
    if (err) { return cb(err); }
    if (result.warning) {
      // TODO: Make this more descriptive, include fields etc.
      self._logger.warning(result.warning);
    }
    cb(null, result.docs);
  });
}


module.exports = PouchDBSoftwareRepository;
