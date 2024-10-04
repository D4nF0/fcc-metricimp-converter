'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;
    let initUnit = convertHandler.getUnit(input);
    let initNum = convertHandler.getNum(input);

    if( !initNum && !initUnit ){
      res.send('invalid number and unit');
    } else if( !initNum ){
      res.send('invalid number');
    } else if( !initUnit ){
      res.send('invalid unit');
    }

    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    })
  });
};
