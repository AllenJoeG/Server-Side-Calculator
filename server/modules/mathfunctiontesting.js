
//Hacking at function that changes req.body format into calculation
//building on client side so I can test easier, then will port to server
// will tag argu: object that is the req.body
function doTheThing(){
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

}; //end doTheThing


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

//take in calculation string, and array of operator positions
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
  console.log(parsedCalculation)
return parsedCalculation;
}

//returns array of index values of operators for provided string. uses isNaN
function operatorCount(string){
  operatorIndexes = [];
  for (let x in string){
    if (isNaN(string[x])){
      operatorIndexes.push(x);
    }
  }
  console.log(operatorIndexes)
  return operatorIndexes;
}; //end operatorCount

let operatorMath = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
};


doTheThing()