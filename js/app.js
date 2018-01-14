// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAuWjgjDXgNHkKnscxwhVpSK6G_p-IZX2s',
  authDomain: 'codebook-cd8c9.firebaseapp.com',
  databaseURL: 'https://codebook-cd8c9.firebaseio.com',
  projectId: 'codebook-cd8c9',
  storageBucket: 'codebook-cd8c9.appspot.com',
  messagingSenderId: '42664775792'
};

firebase.initializeApp(config);

$(document).ready(function() {
  var $loginGoogle = $('#google-login');
  var $loginFb = $('#fb-login');
  var $signOut = $('#sign-out');
  var $loginEmail = $('#email-login');
  var $email = $('#email');
  var $password = $('#password');

  var $username = $('.displayUsername');
  var $userEmail = $('#displayEmail');
  var $profilePhoto = $('#profile-photo');

  // Login con email
  $loginEmail.click(function(event) {
    event.preventDefault();

    var email = $email.val();
    var password = $password.val();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        $(location).attr('href', 'home.html');
      }
    });
  });

  // Login con Google
  var providerGoogle = new firebase.auth.GoogleAuthProvider();
  $loginGoogle.click(function() {
    firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        profilePhoto: user.photoURL
      }).then(
        user => {
          $(location).attr('href', 'home.html');
        });
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });

  // Login con Facebook
  var providerFb = new firebase.auth.FacebookAuthProvider();
  $loginFb.click(function() {
    firebase.auth().signInWithPopup(providerFb).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        profilePhoto: user.photoURL,
      }).then(user => {
        window.location.href = 'home.html';
      });
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });

  // Obteniendo datos del usuario actual
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      var emailVerified = user.emailVerified;
      var uid = user.uid;
      // console.log(user);
      $username.text(name);
      $userEmail.text(email);
      $profilePhoto.attr('src', photoUrl);
    } else {
      // No user is signed in.
    }
  });
  
  // Cerrar sesión
  $signOut.click(function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('Cerrando sesión...');
      $(location).attr('href', 'login.html');
    }).catch(function(error) {
      // An error happened.
    });
  });
});
