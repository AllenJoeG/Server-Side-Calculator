
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