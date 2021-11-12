
$(document).ready(jqReady);

function jqReady(){
  console.log('jQuery wired up.')
  $('.calcButton').on('click', numberClicked)
  $('#clear').on('click', clearButton)
}

function numberClicked(){
  let number = $(this).attr('id');
  $('#calcDisplayOut').append(number);
}

function clearButton(){
  $('#calcDisplayOut').empty();
};

function submitCalculation() {
  //Create array that holds the calculation instructions to be sent as data via POST
  let calculation = [];
  // store 'numbers', 'operator', 'numbers', 'operator', 'numbers'
  //so we can pull the array apart to make our math calc server side

  //AJAX POST the to-be-calculated to /calculate POST route on server.js
  $.ajax({
    method: 'POST',
    url: '/calculate',
    data: calculation,
  }).then((response) => {
    console.log('Calculation Array SENT!')
    
  }).catch((error) => {
    console.log('Calculation Array did NOT send')

  })
};//End Function