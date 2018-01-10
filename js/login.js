$(document).ready(function() {  
  // Declarando variables
  var $loginBtn = $('#login-btn');
  
  // Asociando eventos
  $loginBtn.on('click', login);

  // Funciones
  function login() {
    var $emailLogin = $('#inputEmail1').val();
    var $passwordLogin = $('#inputPassword1').val();
    console.log('click');
    // redireccion a siguiente vista
    $(location).attr('href', 'home.html');
    // Acceso de usuario (EXISTENTE)
    firebase.auth().signInWithEmailAndPassword($emailLogin, $passwordLogin).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  function watcher() {
    // Observador de datos de usuario
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('existe usuario activo');
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        console.log('no existe usuario activo');
        // ...
      }
    });
  }
  watcher();
});