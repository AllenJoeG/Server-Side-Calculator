const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5006;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

let calculationsArray = [];
let calculatedArray = [];

//RES codes: 2XX: good, 5XX: error

//GET ROUTE /calculate - should send {array: calculatedArray, lastCalc: equationResult}
//Required Feature - GET route for songListArray
app.get('/calculate', (req, res) => {
  let responseObject = {
    calc: calculationsArray,
    answer: calculatedArray,
  };
  res.send(responseObject);
});


//POST ROUTE /calculate Receives to-be-calculated from client
app.post('/calculate', (req, res) => {
  //Call Function that changes req.body into calculation
  calculationsArray.push(req.body.calc);
  console.log(calculationsArray);
  doTheMath(req.body)
  
  res.sendStatus(201);
});

//Stretch Goal
//DELETE ROUT /clearHistory to clear calculation history
app.delete('/clearHistory', (req, res) => {
  calculationsArray = [];
  calculatedArray = [];

  res.sendStatus(200);
});


//TODO: REQUIRE in these functions from mathfunctiontest.js
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

//Make the internet happen ✅
app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})