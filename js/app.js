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

var $loginGoogle = $('#google-login');
var $loginFb = $('#fb-login');
var $signOut = $('#sign-out');

// login con Facebook
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
    console.log(user);
    // $(location).attr('href', 'home.html');
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

// login con Google
var providerGoogle = new firebase.auth.GoogleAuthProvider();

$loginGoogle.click(function() {
  firebase.auth().signInWithPopup(providerGoogle).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.displayName);
    console.log(user.photoURL);
    firebase.database().ref('users/' + user.uid).set({
      name: user.displayName,
      email: user.email,
      profilePhoto: user.photoURL
    }).then(user => {
      window.location.href = 'home.html';
    });
    // $(location).attr('href', 'home.html');
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