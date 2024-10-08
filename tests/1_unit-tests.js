const chai = require('chai');
let assert = chai.assert;
const { test } = require('mocha');
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test( '#whole number input', () => {
        let input = '5L';
        assert.equal( convertHandler.getNum( input ), 5 );
    });

    test( '#decimal number input', () => {
        let input = '5.5Mi';
        assert.equal( convertHandler.getNum( input ), 5.5 );
    });

    test( '#fractional number input', () => {
        let input = '8/9Km';
        assert.equal( convertHandler.getNum( input ), 8/9 );
    });

    test( '#fractional and decimal number input', () => {
        let input = '5.7/9lbs';
        assert.equal( convertHandler.getNum( input ), 5.7/9 );
    });

    test( '#error on double fraction', () => {
        let input = '5/9/6mi';
        assert.isNotOk( convertHandler.getNum( input ) );
    });

    test( '#default to 1 when no input', () => {
        let input = 'mi';
        assert.equal( convertHandler.getNum( input ), 1 );
    });

    test( '#valid input units', () => {
        let input = "mi";
        assert.equal( convertHandler.getUnit( input ), "mi" );
    });

    test( '#invalid input units', () => {
        let input = "mil";
        assert.isNotOk( convertHandler.getUnit( input ) );
    });

    test( '#valid return units', () => {
        let input = "mi";
        assert.equal( convertHandler.getReturnUnit( input ), "km" );
    });

    test( '#valid spelled-out units', () => {
        let input = "3.1l";
        let initUnit = convertHandler.getUnit( input );
        assert.equal( convertHandler.spellOutUnit( initUnit ), 'liters' );
    });

    test( '#convert to L', () => {
        let input = 'gal';
        let initNum = convertHandler.getNum( input );
        let initUnit = convertHandler.getUnit( input );

        assert.equal( convertHandler.convert( initNum, initUnit ), '3.78541' );
    });

    test( '#convert to gal', () => {
        let input = 'l';
        let initNum = convertHandler.getNum( input );
        let initUnit = convertHandler.getUnit( input );

        assert.equal( convertHandler.convert( initNum, initUnit ), ' 0.26417' );
    });

    test( '#convert to km', () => {
        let input = 'mi';
        let initNum = convertHandler.getNum( input );
        let initUnit = convertHandler.getUnit( input );

        assert.equal( convertHandler.convert( initNum, initUnit ), '1.60934' );
    });

    test( '#convert to mi', () => {
        let input = 'km';
        let initNum = convertHandler.getNum( input );
        let initUnit = convertHandler.getUnit( input );

        assert.equal( convertHandler.convert( initNum, initUnit ), '0.62137' );
    });

    test( '#convert to kg', () => {
        let input = 'lbs';
        let initNum = convertHandler.getNum( input );
        let initUnit = convertHandler.getUnit( input );

        assert.equal( convertHandler.convert( initNum, initUnit ), '0.45359' );
    }); 

    test( '#convert to lbs', () => {
        let input = 'kg';
        let initNum = convertHandler.getNum( input );
        let initUnit = convertHandler.getUnit( input );

        assert.equal( convertHandler.convert( initNum, initUnit ), '2.20462' );
    }); 
});