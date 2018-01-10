$(document).ready(function() {
  // Declarando variables
  var $signOutBtn = $('#sign-out');
  var $username = $('.displayUsername');
  var $userEmail = $('#displayEmail');
    
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      var emailVerified = user.emailVerified;
      var uid = user.uid;
      console.log(user);
    } else {
      // No user is signed in.
    }
  });
  // Asociando eventos

  // Evento al boton de CERRAR SESION
  // $signOutBtn.on('click', signingOut);
  displayInfo();
  console.log(name);

  // Funciones
  function displayInfo() {
    $username.text(name);
    $userEmail.text(email);
  }
});