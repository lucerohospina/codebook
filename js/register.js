$(document).ready(function() {
  // Declarando variables
  var $regBtn = $('#reg-btn');
  var $emailReg = $('#inputEmail2').val();
  var $passwordReg = $('#inputPassword2').val();

  // Asociando eventos
  $regBtn.on('click', register);

  // Funciones

  function register(event) {
    event.preventDefault();
    console.log('click');
    window.location.href = 'home.html';
    firebase.auth().createUserWithEmailAndPassword($emailReg, $passwordReg).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
});