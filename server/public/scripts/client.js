$(document).ready(jqReady);

function jqReady(){
  console.log('jQuery wired up.');
  $('.calcButton').on('click', numberClicked);
  $('#clear').on('click', clearButton);
  $('.operButton').on('click', operButton);
  $('#equal').on('click', equalButton);
  $('#clearHistory').on('click', clrHistory);
  
  renderCalculations();
  $('#calcDisplayOut').text('');
  $(document).on('click', '.historicalCalcs', displayPrev)
};

let preventOperatorSyntax = true;
let newCalcInput = true;

//Calc number handler
function numberClicked(){
  if (newCalcInput){
    $('#calcDisplayOut').empty();
  };
  let number = $(this).attr('id');
  $('#calcDisplayOut').append(number);
  preventOperatorSyntax = false;
  newCalcInput = false;
};

//Calc Clear handler
function clearButton(){
  $('#calcDisplayOut').empty();
  preventOperatorSyntax = true;
  newCalcInput = true;
};

//Calc operators handler
function operButton(){
  if (preventOperatorSyntax){
    window.alert('Please Avoid Syntax Errors');
    // TODO change this to replace the last entered operator with new one
    //fetch $('#calcDisplayOut).text() and replace the final value
    //then update $('#calcDisplayOut)
  } else {
    let operator = $(this).attr('id');
    $('#calcDisplayOut').append(operator);
    preventOperatorSyntax = true;
  };
};

//Includes Stretch Goal Functionality, won't submit if improper calculation
//Calc equal handler
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
  preventOperatorSyntax = true;
  newCalcInput = true;
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
    if (response.calc.length != 0){
      $('#calcDisplayOut').text(`${response.calc[response.calc.length - 1]} = ${response.answer[response.answer.length - 1]}`);
    };
      $('.calcHistory').empty();
    for (let i in response.calc){
      $('.calcHistory').append(`
        <li class="historicalCalcs">${response.calc[i]} = ${response.answer[i]}</li>
      `);
    };
  });
};

//Stretch Goal
//DELETE route to clear calc history.
function clrHistory(){
  $.ajax({
    method: 'DELETE',
    url: '/clearHistory',
  }).then(function (response){
    $('.calcHistory').empty();
    $('#calcDisplayOut').empty();
  });
};

function displayPrev(){
  let prevCalc = $(this).text();
  $('#calcDisplayOut').text(prevCalc);
  newCalcInput = true;
}