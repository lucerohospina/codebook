$(document).ready(function() {
  // Declarando variables
  var $loginBtn = $('#login-btn');
  // var $emailLogin = $('#inputEmail1').val();
  // var $passwordLogin = $('#inputPassword1').val();

  // Asociando eventos
  $loginBtn.on('click', loginAccount);


  // Funciones
  function loginAccount(event) {
    event.preventDefault();
    console.log('click');
  }
});