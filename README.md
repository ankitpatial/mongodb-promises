mongodb-promises
================

A simple promise wrapper around mongodb(peer dependency) nodejs drivers.

## How to use it?

### In a big app.
- Create a file may be db.js and put below code into that.
```
var config      = require('config'),
    db          = require('mongodb-promises').db(config.db.host, config.db.name);
module.exports = db;
```

- Now you can use db.js any no. of time time making sure all sharing same db object instance.

```
var db          = require('./db')
    todoColl    = db.collection('todos');

todoColl.insert([{text: 'first task to do'}, {text: 'second task to do'}])
        .then(function (resultArr) {
            console.log('saved successfully');
        })
        .catch(function (err) {
            console.error('Error on insert ', err);
        });

```

### Simple one file script
```
var db          = require('mongodb-promises').db('host:port', 'db_name'), // host can be array in case of replSet
    todoColl    = db.collection('todos');

todoColl.insert([{text: 'first task to do '}, {text: 'second task to do'}])
        .then(function (resultArr) {
            console.log('saved successfully');
        })
        .catch(function (err) {
            console.error('Error on insert ', err);
        });

```

## List of DB methods
- **collection(collectionName, options)** Returns a collection object to perform operations on a collection using promises.
- **drop()** To drop database, call it carefully.
- **createCollection(name, options)** Creates a collections on mongodb, usefull if you want collections be created before use(Mongodb can create collection if not exist on first document creation).

## List of Collection methods
- **insert(doc, options)** Insert single or array of document(s) [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#insert)
- **remove(selector, options)** Remove dcument(s) [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#remove)
- **rename(newName)** Rename collection [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#remove)
- **save(doc, options)**. [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#save)
- **update(selector, doc, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#update)
- **updateUpsert(selector, doc)** Update Or upsert document.
- **updateMulti(selector, doc)** Update multiple records.
- **distinct(key, query, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#distinct)
- **count(filter)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#count)
- **countAll()** Count all documents in collection.
- **drop()** Drop collection, use it carefully [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#drop)
- **findAndModify(query, sort, doc, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#findAndModify)
- **findAndModifyOrUpsert(query, sort, doc)**
- **findAndRemove(query, sort, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#findAndRemove)
- **find(query, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#find)
- **findOne(query, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#findOne)
- **mapReduce(map, reduce, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#mapReduce)
- **group(keys, condition, initial, reduce, finalize, command, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#group)
- **options()** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#options)
- **isCapped()** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#isCapped)
- **geoNear(x, y, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#geoNear)
- **geoHaystackSearch(x, y, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#geoHaystackSearch)
- **aggregate(array, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#aggregate)
- **stats()** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#stats)

- **indexes()** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#indexes)
- **createIndex(fieldOrSpec, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#createIndex)
- **ensureIndex(fieldOrSpec, options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#ensureIndex)
- **indexInformation(options)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#indexInformation)
- **dropIndex(name)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#dropIndex)
- **dropAllIndexes()** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#dropAllIndexes)
- **reIndex()** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#reIndex)
- **indexExists(indexNames)** [mongodb api](http://mongodb.github.io/node-mongodb-native/api-generated/collection.html#indexExists)

### Changes Log
#### 0.2.0
- Mongodb package as peer dependency.