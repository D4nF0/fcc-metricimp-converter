const inputSplitter = ( input ) => {
  let nums = input.match(/[.\d\/]+/g) || ["1"];
  let units = input.match(/[a-zA-Z]+/g);

  return [ nums[0], units[0] ];
}

const divCheck = ( input ) => {
  let arr = input.split('/');

  // 1 return ["1"]
  // 1.2/2 return ["1.2", "2"]
  // 1/2/2 return ["1", "2", "2"]

  if( arr.length > 2 ) return false;
  return arr;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let nums = inputSplitter(input)[0];
    let numArr = divCheck(nums);

    if( !numArr ) undefined;

    let firstNum = numArr[0];
    let secondNum = numArr[1] || ["1"];

    if( isNaN(firstNum) || isNaN(secondNum) ) return undefined;

    let result = parseFloat(firstNum) / parseFloat(secondNum);

    return result;
  };
  
  this.getUnit = function(input) {
    let units = inputSplitter(input)[1].toLowerCase();
    
    switch(units){
      case 'gal':
        return 'gal';
      case 'l':
        return 'L';
      case 'mi':
        return 'mi';
      case 'km':
        return 'km';
      case 'lbs':
        return 'lbs';
      case 'kg':
        return 'kg';
      default:
        return undefined
    };
  };
  
  this.getReturnUnit = function(initUnit) {
    let units = initUnit.toLowerCase();
    
    switch(units){
      case 'gal':
        return 'L';
      case 'l':
        return 'gal';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      default:
        return undefined
    };
  };

  this.spellOutUnit = function(initUnit) {
    let units = initUnit.toLowerCase();
    
    switch(units){
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      default:
        return undefined
    };
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let units = initUnit.toLowerCase();
    let result;

    switch(units){
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return undefined;
    }
    
    return parseFloat(result.toFixed(4));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
