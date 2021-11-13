
$(document).ready(jqReady);

function jqReady(){
  console.log('jQuery wired up.');
  $('.calcButton').on('click', numberClicked);
  $('#clear').on('click', clearButton);
  $('.operButton').on('click', operButton);
  $('#equal').on('click', equalButton);
};

function numberClicked(){
  let number = $(this).attr('id');
  $('#calcDisplayOut').append(number);
}

function clearButton(){
  $('#calcDisplayOut').empty();
};

function operButton(){
  let operator = $(this).attr('id');
  $('#calcDisplayOut').append(operator);
};

function equalButton(){
  //This function is going to package up my calculation as data 
  //Then call submitCalculation() to POST it out w AJAX
  let calcString = $('#calcDisplayOut').text();
  console.log(calcString);

  //Create array that holds the calculation instructions to be sent as data via POST
  let calculation = {calcOrder: []};
  // store 'numbers', 'operator', 'numbers', 'operator', 'numbers' into an array
  // pack that array into an object when it gets sent as {data: array} by AJAX
  //Then server-side pull the array apart to make our math calc server side

  submitCalculation(calcString);

}

function submitCalculation(calculation) {
  let calcData = {calc: calculation};
  //AJAX POST the to-be-calculated to /calculate POST route on server.js
  //Per Kris Szafranski, use function (param) { } instead of arrow functions on client side.
  $.ajax({
    method: 'POST',
    url: '/calculate',
    data: calcData,
  }).then(function(response) {
    console.log('Calculation Array SENT!')
    //call the GET to put result and history on the DOM
    
  }).catch(function(error) {
    console.log('Calculation Array did NOT send')

  })
};//End Function


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

sliceAndDice(mRQ, mRQArray);
sliceAndDice(mRQ2, mRQArray2);
sliceAndDice(mRQ3, mRQArray3);

}; //end doTheThing

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

doTheThing();