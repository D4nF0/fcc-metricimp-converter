const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { test } = require('mocha');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test( 'Get request => valid input', ( done ) => {
        chai
        .request( server )
        .keepOpen()
        .get('/api/convert?input=10L')
        .end( (err, res) => {
            assert.equal( res.status, 200 );
            assert.equal( res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}' );
            done();
        });
    });

    test( 'Get request => invalid input', ( done ) => {
        chai
        .request( server )
        .keepOpen()
        .get('/api/convert?input=32g')
        .end( (err, res) => {
            assert.equal( res.status, 200 );
            assert.equal( res.text, 'invalid unit' );
            done();
        });
    });

    test( 'Get request => invalid number', ( done ) => {
        chai
        .request( server )
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kg')
        .end( (err, res) => {
            assert.equal( res.status, 200 );
            assert.equal( res.text, "invalid number" );
            done();
        });
    });

    test( 'Get request => invalid unit and number', ( done ) => {
        chai
        .request( server )
        .keepOpen()
        .get('/api/convert?input=3/7.2/4kilomegagram')
        .end( (err, res) => {
            assert.equal( res.status, 200 );
            assert.equal( res.text, "invalid number and unit" );
            done();
        });
    });

    test( 'Get request => no number', ( done ) => {
        chai
        .request( server )
        .keepOpen()
        .get('/api/convert?input=kg')
        .end( (err, res) => {
            assert.equal( res.status, 200 );
            assert.equal( res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}' );
            done();
        });
    });

});
