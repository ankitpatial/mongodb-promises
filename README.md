mongodb-promises
================

A simple promises wrapper around mongodb nodejs drivers.

## Install
To install the most recent release from npm, run:
```
npm install mongodb-promises
```

## How to use it?
```
var db          = require('mongodb-promises')('host:port', 'db_name'), // host can be array in case of replSet
    todoColl    = db.collection('todos');

todoColl.insert([{text: 'first todo'}, {text: 'second todo'}])
        .then(function (resultArr) {
            console.log('saved successfully');
        })
        .catch(function (err) {
            console.error('Error on insert ', err);
        });

```

## List of functions for DB
- collection(collectionName, options)

## List of functions for Collection
    will add it soon
