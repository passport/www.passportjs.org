var uuid = require('uuid/v1');


function PouchDBVersionRepository(db, logger) {
  this._db = db;
  this._logger = logger;
  this._type = 'Version';
}

PouchDBVersionRepository.prototype.create = function(obj, cb) {
  obj['@type'] = this._type;
  obj._id = uuid();
  
  this._db.put(obj, function(err, result) {
    if (err) { return cb(err); }
    obj._rev = result.rev;
    return cb(null, obj);
  });
}

PouchDBVersionRepository.prototype.update = function(obj, cb) {
  console.log('UPDATE!')
  console.log(obj)
  
  this._db.put(obj, function(err, result) {
    if (err) { return cb(err); }
    console.log('UPDATE RESULT');
    console.log(result);
    
    obj._rev = result.rev;
    return cb(null, obj);
  });
}

PouchDBVersionRepository.prototype.get = function(id, cb) {
  /*
  this._db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    if (err) { return next(err); }
    console.log(doc.rows);
    cb();
  });
  */
}

PouchDBVersionRepository.prototype.query = function(q, cb) {
  var request = {
    selector: { downloadUrl: q }
  }
  
  var self = this;
  this._db.find(request, function(err, result) {
    if (err) { return cb(err); }
    if (result.warning) {
      // TODO: Make this more descriptive, include fields etc.
      self._logger.warning(result.warning);
    }
    return cb(null, result.docs.length ? result.docs : undefined);
  });
}


module.exports = PouchDBVersionRepository;
