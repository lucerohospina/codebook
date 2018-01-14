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
  $nameInput.on('input', function() {
    console.log('HOLA');
    if ($nameInput.val().length >= 3) {
      $validateName = true;
      ableRegBtn();
      $nameInput.popover('hide');
    } else {
      disableRegBtn();
      $nameInput.popover('show');
    }
  });

  $lastInput.on('input', function() {
    console.log('CHAU');
    if ($lastInput.val().length >= 3) {
      $validateLast = true;
      ableRegBtn();
      $lastInput.popover('hide');
    } else {
      disableRegBtn();
      $lastInput.popover('show');
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

  // Funciones para los input de email y password
  $emailInput.on('input', function() {
    console.log('escribiendo email');
    var $regexEmail = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;
    console.log($regexEmail.test($(this).val()));
    if ($regexEmail.test($(this).val())) {
      $validateEmail = true;
      ableRegBtn();
      $emailInput.popover('hide');
    } else {
      disableRegBtn();
      $emailInput.popover('show');
    }
  });

  $passwordInput.on('input', function() {
    console.log('escribiendo password');
    var $regexPassword = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z\0-9]{6,}$/;
    console.log($regexPassword.test($(this).val()));
    if ($regexPassword.test($(this).val())) {
      $validatePassword = true;
      ableRegBtn();
      $passwordInput.popover('hide');
    } else {
      disableRegBtn();
      $passwordInput.popover('show');
    }
  });

  // Funcion para el registro de usuario al click del boton
  function register() {
    var $emailReg = $emailInput.val();
    var $passwordReg = $passwordInput.val();
    var $usernameReg = $nameInput.val() + $lastInput.val();
  
    console.log($emailReg);
    console.log($passwordReg);

    // Registro de Usuario (NUEVO) con FIREBASE
    firebase.auth().createUserWithEmailAndPassword($emailReg, $passwordReg)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    firebase.auth().onAuthStateChanged(function(user) {
      var username = $nameInput.val() + ' ' + $lastInput.val();    
      if (user) {
        firebase.database().ref('users/' + user.uid).set({
          name: username,
          email: user.email,
          uid: user.uid,
          profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/codebook-cd8c9.appspot.com/o/postedImages%2Fdefault.jpg?alt=media&token=5897a927-f9b6-4ded-9331-0dc8032ae325'
        }).then(user => {
          window.location.href = 'home.html';
        }); 
        console.log('User is registered.');
      } else {
        console.log('Registration failed.');   
      }
    });
  }


  $(function() {
    $('[data-toggle="popover"]').popover();
  });

  $('.popover-dismiss').popover({
    trigger: 'focus'
  });
});
