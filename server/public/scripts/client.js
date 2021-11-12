
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