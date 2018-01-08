$(document).ready(function() {
  // Declarando variables
  var $regBtn = $('#reg-btn');

  // Asociando eventos
  $regBtn.click(register);

  // Funciones

  function register() {
    var $emailReg = $('#inputEmail').val();
    var $passwordReg = $('#inputPassword').val();

    console.log('click');
    console.log($emailReg);
    console.log($passwordReg);
    // redireccion a siguiente vista
    $(location).attr('href', 'home.html');
    // Registro de Usuario (NUEVO)
    firebase.auth().createUserWithEmailAndPassword($emailReg, $passwordReg).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
});

