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
};

function clearButton(){
  $('#calcDisplayOut').empty();
  preventOperatorSyntax = true;
};

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

    for (let i in response.calc){
      $('.calcHistory').append(`
        <li>${response.calc[i]}: ${response.answer[i]}</li>
      `);
    };
  });
};
