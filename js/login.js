$(document).ready(function() {  
  // Declarando variables
  var $loginBtn = $('#login-btn');
  
  // Asociando eventos
  $loginBtn.on('click', login);

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