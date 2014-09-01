var mongoClient     = require('mongodb').MongoClient,
    debug           = require('debug')('db'),
    Q               = require('q'),
    EventEmitter    = require('events').EventEmitter,
    util            = require('util'),
    Collection      = require('./collection');


module.exports = function (host, db, options) {
    return new DB(host, db, options);
}

var DB_STATES = {
    NOT_CONNECTED   : 1,
    CONNECTING      : 2,
    CONNECTED       : 3
}

function DB(host, name, options) {
    this.host           = host;
    this.name           = name;
    this.options        = options || {w: 0, native_parser: true};
    this.state          = DB_STATES.NOT_CONNECTED;
    this.db             = undefined;
    this.connectQueue   = [];

}

util.inherits(DB, EventEmitter);

/***
 *
 * @param collectionName
 * @param options = {readPreference: String, slaveOk: Boolean, serializeFunctions: Boolean}
 * @returns {Collection}
 */
DB.prototype.collection = function (collectionName, options) {
    return new Collection(this, collectionName)
};

DB.prototype._validateOptions = function () {
    var self        = this,
        deferred    = Q.defer(),
        err         = [];

    if(!self.name) {
        err.push('DB Name is missing');
    }

    if(!self.host) {
        err.push('DB Host is missing');
    }


    if (err.length > 0) {
        deferred.reject(err.join(', '))
    } else {
        deferred.resolve();
    }

    return deferred.promise;
};

DB.prototype._emitError = function (err) {
    this.emit('error', err);
};

/***
 * Connect with mongoDb
 * @returns {promise|*|Q.promise}
 */
DB.prototype.connect = function () {
    var deferred    = Q.defer(),
        self        = this,
        resolve     = function (db) {
            var i=0;
            for(i; i < self.connectQueue.length; i++) {
                self.connectQueue.pop().resolve(db);
            }
        },
        reject      = function (err) {
            var i=0;
            for(i; i < self.connectQueue.length; i++) {
                self.connectQueue.pop().reject(err);
            }
        };

    this._validateOptions()
        .then(function () {

            if (self.state === DB_STATES.NOT_CONNECTED) {       // connect to mongo
                self.connectQueue.push(deferred);
                self.state = DB_STATES.CONNECTING;

                var host;
                if(util.isArray(self.host)) {
                    host = self.host.join(',');
                } else {
                    host = self.host;
                }

                var dbUrl  = util.format("mongodb://%s/%s", host, self.name)
                mongoClient.connect(dbUrl, {native_parser:true}, function (err, db) {
                    if (err) {
                        self._emitError(err);
                        reject(err);
                    } else {
                        // update state
                        self.state = DB_STATES.CONNECTED;
                        self.db = db;

                        resolve(db);
                    }
                });
            } else if (self.state === DB_STATES.CONNECTING) {
                self.connectQueue.push(deferred);
            } else {
                deferred.resolve(self.db);
            }
        })
        .catch(function (err) {
            self.state = DB_STATES.NOT_CONNECTED;
            deferred.reject(err);
        });

    return deferred.promise;
};

DB.prototype.drop = function () {
    var deferred = Q.defer();

    this.connect()
        .then(function (db) {
            return Q.ninvoke(db, 'dropDatabase');
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};


/**
 * Create collection in mongodb
 * @param name
 * @param options {capped: <boolean>, autoIndexId: <boolean>, size: <number>, max: <number>}
 * @returns {promise|*|Q.promise|*|null}
 */
DB.prototype.createCollection = function (name, options) {
    var deferred = Q.defer();

    this.connect()
        .then(function (db) {
            return Q.ninvoke(db, 'createCollection', name, options);
        })
        .then(deferred.resolve)
        .catch(deferred.reject);

    return deferred.promise;
};