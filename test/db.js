var expect = require('chai').expect,
    db = require('../lib/db')('localhost', 'test_db');

describe('Db Wrapper - ', function () {
    it('connect to db', function (done) {
        db
            .connect()
            .then(function (db) {
                expect(db).to.not.eql(null);
                done();
            })
            .catch(done);
    });

    it('create  a Collection', function (done) {
        db
            .createCollection('coll1')
            .then(function (coll) {
                expect(coll).to.not.eql(null);
                done();
            })
            .catch(done)

    });

    it('rename a Collection', function (done) {
        db
            .renameCollection('coll1', 'coll11')
            .then(function (coll) {
                expect(coll).to.not.eql(null);
                done();
            })
            .catch(done)

    });

    it('drop a collection', function (done) {
        db
            .dropCollection('coll11')
            .then(function (coll) {
                expect(coll).to.not.eql(null);
                done();
            })
            .catch(done)

    });

    it('drop database', function (done) {
        db
            .drop()
            .then(function (result) {
                expect(result).to.not.eql(null);
                done();
            })
            .catch(done)

    });

});

