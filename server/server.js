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


function doTheMath(object){
  let calcString = object.calc;
  let operatorsArray = operatorCount(calcString);
  let parsedCalc = sliceAndDice(calcString, operatorsArray);
  calculationsArray.push(parsedCalc);

  
  // Translate parsedCalc into javascript math
}

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
  return operatorIndexes;
}; //end operatorCount

//Make the internet happen
app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})