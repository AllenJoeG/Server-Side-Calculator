//Not wired up. This was all the unit testing I did on the math functions I wrote for server.js
//TODO: Wire this up EXPORT MODULE, and REQUIRE into server.js

//Hacking at function that changes req.body format into calculation
//building on client side so I can test easier, then will port to server
// will tag argu: object that is the req.body
function doTheTesting(){
  let mockReqBody = {calc: '66+33'};
  let mockReqBody2 = {calc: '467/13*20'};
  let mockReqBody3 = {calc: '46-12+13/15*48'}

  console.log('How JS maths "66 + 33"', 66 + 33);
  console.log('How JS maths "467 / 13 * 20', 467 / 13 * 20);
  console.log('How JS maths "46 - 12 + 13 / 15 * 48', 46 - 12 + 13 / 15 * 48);

  let mRQ = mockReqBody.calc;
  let mRQ2 = mockReqBody2.calc;
  let mRQ3 = mockReqBody3.calc;

let mRQArray = operatorCount(mRQ); //['2']
let mRQArray2 = operatorCount(mRQ2); //['3', '6']
let mRQArray3 = operatorCount(mRQ3); //['2', '5', '8', '11']

let parsedCalc1 = sliceAndDice(mRQ, mRQArray); //['66', '+', '33']
let parsedCalc2 = sliceAndDice(mRQ2, mRQArray2); //['467, '/', '13', '*', '20']
let parsedCalc3 = sliceAndDice(mRQ3, mRQArray3); //['46', '-', '12, '+', '13', '/', '15', '*', '48']
let test4 = ['12', '*', '14', '-', '12', '/', '14', '*', '13', '+', '27', '*', '13', '/', '21'];
let test5 = ['12', '*', '14', '*', '12', '*', '14', '*', '13', '*', '27', '*', '13', '*', '21'];

console.log('logging MD on parseCalcMD(parsedCalc2):', parseCalcMD(parsedCalc2));
console.log('logging MD on parseCalcMD(parsedCalc3):', parseCalcMD(parsedCalc3));
console.log('logging MD on parseCalcMD(test4):', parseCalcMD(test4));
console.log('logging MD on parseCalcMD(test5):', parseCalcMD(test5));

console.log('logging AS on parseCalcAS(parseCalcMD(parsedCalc2)):', parseCalcAS(parseCalcMD(parsedCalc2)));
console.log('logging AS on parseCalcAS(parseCalcMD(parsedCalc3)):', parseCalcAS(parseCalcMD(parsedCalc3)));
console.log('logging AS on parseCalcAS(parseCalcMD(test4)):', parseCalcAS(parseCalcMD(test4)));

}; //end doTheTesting

// Call all the math functions on the incoming POST object
function doTheMath(object){
  //Catch incoming equation
  let calcString = object.calc;
  //Map the location of operators in the incoming equation
  let operatorsArray = operatorCount(calcString);
  //Parse calcString and operator map Array into Array equation of numbers and operators
  let parsedCalc = sliceAndDice(calcString, operatorsArray);

  //Pass parsed calculation through Order of Operations
  //(peMDas) parseCalcMD(parsedCalc);
  // Solves all the multiplication, then all of the division
  let parsedCalcMD = parseCalcMD(parsedCalc);
  //(pemdAS) parseCalcAS(parsedCalcMD);
  // Solves all the addition, then all of the subtraction
  let finalCalc = parseCalcAS(parsedCalcMD);
  //push finalCalc to calculatedArray;
  calculatedArray.push(finalCalc);
  //Visual checksum
  console.log(calculatedArray);
};

//allows us to call operatorMath['oper'](x, y) ✅
let operatorMath = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
};

//Function loop through parsedCalc and reduce all the multiplication and division ✅
//return parsedCalcMD
function parseCalcMD(array){
  //Do the Multiplications
  while (array.includes('*')){
    for (let i in array){
      i++; //skips two at a time to operators
      if (array[i] === '*'){
        // (operatorMath['*'](Number(array[i - 1]), Number(array[i + 1])));
        array.splice((i - 1), 3, (operatorMath['*'](Number(array[i - 1]), Number(array[i + 1]))))
      }; 
    };
  };//end while
  //Do the Divisions
  while (array.includes('/')){
    for (let i in array){
      i++; //skips two at a time to operators
      if (array[i] === '/'){
        // (operatorMath['*'](Number(array[i - 1]), Number(array[i + 1])));
        array.splice((i - 1), 3, (operatorMath['/'](Number(array[i - 1]), Number(array[i + 1]))))
      }; 
    };
  };
  let parsedCalcMD = array;
  return parsedCalcMD;
}; // end parseCalcMD 


//Function loop through parsedCalcMD and do all the addition and subtraction ✅
//return finalCalc,
function parseCalcAS(array){
  //Do the Additions
  while (array.includes('+')){
    for (let i in array){
      i++; //skips two at a time to operators
      if (array[i] === '+'){
        array.splice((i - 1), 3, (operatorMath['+'](Number(array[i - 1]), Number(array[i + 1]))))
      }; 
    };
  };
  //Do the Subtractions
  while (array.includes('-')){
    for (let i in array){
      i++; //skips two at a time to operators
      if (array[i] === '-'){
        // (operatorMath['*'](Number(array[i - 1]), Number(array[i + 1])));
        array.splice((i - 1), 3, (operatorMath['-'](Number(array[i - 1]), Number(array[i + 1]))))
      }; 
    };
  };
  let parsedCalcAS = array;
  return parsedCalcAS;
}; // end parseCalcAS

//take in calculation string, and array of operator positions ✅
//make slices based on index positions of operators
//returns array [number, operator, number, operator, number]
function sliceAndDice(string, array){
  let parsedCalculation = [];
  let strX = 0;

  for (let x of array){
    parsedCalculation.push(string.slice(strX, x));
    parsedCalculation.push(string[x]);
    strX = (Number(x)+1);
  };
  parsedCalculation.push(string.slice(strX, (string.length)));
return parsedCalculation;
}

//returns array of index values of operators for provided string. uses isNaN ✅
function operatorCount(string){
  operatorIndexes = [];
  for (let x in string){
    if (isNaN(string[x]) && (string[x] != '.')){
      operatorIndexes.push(x);
    }
  }
  return operatorIndexes;
}; //end operatorCount
