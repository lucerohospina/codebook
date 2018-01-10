$(document).ready(function() {
  // Declarando variables
  var $regBtn = $('#reg-btn');
  var $nameInput = $('#inputName');
  var $lastInput = $('#inputLastName');
  var $checkBox = $('input[type="checkbox"]');
  var $emailInput = $('#inputEmail');
  var $passwordInput = $('#inputPassword');

  var $validateName = false;
  var $validateLast = false;
  var $validateChecked = false;
  var $validateEmail = false;
  var $validatePassword = false;

  // Asociando eventos
  $regBtn.click(register);
  
  // Funciones
  // Funciones para el regBtn
  function ableRegBtn() {
    if ($validateName && $validateLast && $validateChecked && $validateEmail && $validatePassword) {
      $regBtn.removeAttr('disabled');
    }
  }
  function disableRegBtn() {
    $regBtn.attr('disabled', true);
  }

  // Funciones para los input de nombre, apellido y check
  $nameInput.on('keyup', function() {
    console.log('HOLA');
    if ($nameInput.val() !== '' && $nameInput.val()) {
      $validateName = true;
      ableRegBtn();
    } else {
      disableRegBtn();
    }
  });

  $lastInput.on('keyup', function() {
    console.log('CHAU');
    if ($lastInput.val() !== '' && $lastInput.val()) {
      $validateLast = true;
      ableRegBtn();
    } else {
      disableRegBtn();
    }
  });

  $checkBox.on('click', function(event) {
    console.log(event.target.checked);
    if (event.target.checked) {
      $validateChecked = true;
      ableRegBtn();
    } else {
      disableRegBtn();
    }
  });

  $emailInput.on('keyup', function() {
    console.log('escribiendo email');
    if ($emailInput.val() !== '' && $emailInput.val()) {
      $validateEmail = true;
      ableRegBtn();
    } else {
      disableRegBtn();
    }
  });

  $passwordInput.on('keyup', function() {
    console.log('escribiendo password');
    if ($passwordInput.val() !== '' && $passwordInput.val()) {
      $validatePassword = true;
      ableRegBtn();
    } else {
      disableRegBtn();
    }
  });

  // Funcion para el registro de usuario al click del boton
  function register() {
    var $emailReg = $('#inputEmail').val();
    var $passwordReg = $('#inputPassword').val();
  
    console.log('click');
    console.log($emailReg);
    console.log($passwordReg);

    // Registro de Usuario (NUEVO) con FIREBASE
    firebase.auth().createUserWithEmailAndPassword($emailReg, $passwordReg).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    }).then(user => {
      window.location.href = 'home.html';
    }); 
  }
});
