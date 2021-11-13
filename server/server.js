const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

const calculationsArray = [];
let calculatedArray = [];

//RES codes: 2XX: good, 5XX: error

//GET ROUTE /calculate - should send {array: calculatedArray, lastCalc: equationResult}
//Required Feature - GET route for songListArray
app.get('/calculate', (req, res) => {
  res.send(calculationsArray);
});


//POST Route receiving to-be-calculated from client
app.post('/calculate', (req, res) => {
  // calculationsArray.push(req.body);
  console.log(calculationsArray);
  doTheMath(req.body)
  //Call Function that changes req.body into calculation
  res.sendStatus(201);
});

// Call all the math functions in the rigth order
function doTheMath(object){
  let calcString = object.calc;
  let operatorsArray = operatorCount(calcString);
  let parsedCalc = sliceAndDice(calcString, operatorsArray);
  calculationsArray.push(parsedCalc);

  
  // Translate parsedCalc into javascript math
  //call parseCalcMD(parsedCalc);
  //call parseCalcAS(parsedCalcMD);
  //push finalCalc to calculatedArray;

}

//allows us to call operatorMath['oper'](x, y) ✅
let operatorMath = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
};

//Function loop through parsedCalc and reduce all the multiplication and division
//return parsedCalcMD


//Function loop through parsedCalcMD and do all the addition and subtraction
//return finalCalc,

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
    if (isNaN(string[x])){
      operatorIndexes.push(x);
    }
  }
  return operatorIndexes;
}; //end operatorCount

//Make the internet happen ✅
app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})