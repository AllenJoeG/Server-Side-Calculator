
$(document).ready(jqReady);

function jqReady(){
  console.log('jQuery wired up.');
  $('.calcButton').on('click', numberClicked);
  $('#clear').on('click', clearButton);
  $('.operButton').on('click', operButton);
  $('#equal').on('click', equalButton);
  renderCalculations();
};

let preventOperatorSyntax = true;

function numberClicked(){
  let number = $(this).attr('id');
  $('#calcDisplayOut').append(number);
  preventOperatorSyntax = false;
}

function clearButton(){
  $('#calcDisplayOut').empty();
  preventOperatorSyntax = true;
};

function operButton(){
  if (preventOperatorSyntax){
    window.alert('Please Avoid Syntax Errors');
    //change this to replace the last entered operator with new one
    //fetch $('#calcDisplayOut).text() and replace the final value
    //then update $('#calcDisplayOut)
  } else {
    let operator = $(this).attr('id');
    $('#calcDisplayOut').append(operator);
    preventOperatorSyntax = true;
  };
};

function equalButton(){
  //conditional that won't allow a submission that ends in an operator
  if(preventOperatorSyntax){
    window.alert('Calculation may not end with an operator!')
  } else {
  // Package up my calculation as string data 
  let calcString = $('#calcDisplayOut').text();
  console.log('Passing calculation: ', calcString, ' to AJAX POST /calculate');
  //Then call submitCalculation() to POST it out w AJAX as an object
  submitCalculation(calcString);
  };
};

//POST ROUTE sending to server upon 'equal' click
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
    $('#calcDisplayOut').empty();
    // TODO: call the GET to put result and history on the DOM
    renderCalculations();

  }).catch(function(error) {
    console.log('Calculation Array did NOT send')

  });
};//End Function

//GET ROUTE /calculate and RENDER calculated data
function renderCalculations(){

  $.ajax({
    method: 'GET',
    url: '/calculate',
    
  }).then(function (response){
    $('.calcHistory').empty();
    for (let calculation of response){
      $('.calcHistory').append(`
        <li>${calculation}</li>
      `);
    };//end for
  
  });
};

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

sliceAndDice(mRQ, mRQArray); //['66', '+', '33']
sliceAndDice(mRQ2, mRQArray2); //['467, '/', '13', '*', '20']
sliceAndDice(mRQ3, mRQArray3); //['46', '-', '12, '+', '13', '/', '15', '*', '48']

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
