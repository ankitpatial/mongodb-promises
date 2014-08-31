// ref http://mongodb.github.io/node-mongodb-native/api-generated/collection.html

var debug   = require('debug')('collection'),
    Q       = require('Q');

module.exports = Collection;

function Collection (db, name, options) {
    this.db         = db;
    this.name       = name;
    this.options    = options
}


Collection.prototype._coll = function () {
    var deferred, self;

    self = this;
    deferred= Q.defer();

    this.db.connect()
        .then(function (db) {
            deferred.resolve(db.collection(self.name, self.options));
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.insert = function (doc, options) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'insert', doc, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.remove = function (selector, options) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'remove', selector, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.rename = function (newName) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'rename', newName);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.save = function (doc, options) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'save', doc, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

/**
 *
 * @param selector <object: required>
 * @param doc <object: required>
 * @param options {upsert: <Boolean, default:false>, multi: <Boolean, default:false>, checkKeys: <Boolean, default:true> }
 * @returns {promise|*|Q.promise}
 */
Collection.prototype.update = function (selector, doc, options) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'update', selector, {$set: doc}, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};
/**
 *
 * @param selector <object: required>
 * @param doc   <object: require>
 * @returns {promise|*|Q.promise}
 */
Collection.prototype.updateUpsert = function (selector, doc) {
    return this.update(selector, doc, {upsert: true, w: 1});
};

Collection.prototype.updateMulti = function (selector, doc) {
    return this.update(selector, doc, {multi: true, w: 1});
};

Collection.prototype.distinct = function (key, query, options) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'distinct', key, query, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.count = function (filter) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'count', filter);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.countAll = function () {
    return this.count();
};

Collection.prototype.drop = function () {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'drop');
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.findAndModify = function (query, sort, doc, options) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'findAndModify', query, sort, {$set: doc}, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.findAndModifyOrUpsert = function (query, sort, doc) {
    return this.findAndModify(query, sort, doc, {new:true, upsert:true, w:1});
};

Collection.prototype.findAndRemove = function (query, sort, options) {
    var deferred;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'findAndModify', query, sort, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.find = function (query, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            cursor = coll.find(query, options);
            return Q.ninvoke(cursor, 'toArray');
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.findOne = function (query, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'findOne', query, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};


Collection.prototype.createIndex = function (fieldOrSpec, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'createIndex', fieldOrSpec, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.ensureIndex = function (fieldOrSpec, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'ensureIndex', fieldOrSpec, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.indexInformation = function (options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'indexInformation', options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.dropIndex = function (name) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'dropIndex', name);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.dropAllIndexes = function () {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'dropAllIndexes');
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.reIndex = function () {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'reIndex');
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.mapReduce = function (map, reduce, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'mapReduce', map, reduce, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};


Collection.prototype.group = function (keys, condition, initial, reduce, finalize, command, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'group', keys, condition, initial, reduce, finalize, command, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.options = function () {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'options');
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.isCapped = function () {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'isCapped');
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.indexExists = function (indexNames) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'indexExists', indexNames);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.geoNear = function (x, y, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'geoNear', x, y, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.geoHaystackSearch = function (x, y, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'geoHaystackSearch', x, y, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.indexes = function () {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'indexes');
        })
        .catch(deferred.reject);

    return deferred.promise;
};

Collection.prototype.aggregate = function (array, options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'aggregate', array, options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};


Collection.prototype.stats = function (options) {
    var deferred, cursor;
    deferred = Q.defer();

    this._coll()
        .then(function (coll) {
            return Q.ninvoke(coll, 'stats', options);
        })
        .catch(deferred.reject);

    return deferred.promise;
};






