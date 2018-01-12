$(document).ready(function() {
  var $loginBtn = $('#email-login');

  $loginBtn.on('click', userLogin);

  function userLogin() {
    var $emailLog = $('#email').val();
    var $passwordLog = $('#password').val();
  
    console.log('click');
    console.log($emailLog);
    console.log($passwordLog);
    firebase.auth().signInWithEmailAndPassword($emailLog, $passwordLog).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode);
      console.log($passwordLog);
    }).then(user => {
      window.location.href = 'home.html';
    }); 
  }

  function loginwatcher() {
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
        console.log('no existe usuario reg')
        // ...
      }
    });
  }
  loginwatcher();
});