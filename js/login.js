$(document).ready(function() {  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // $(location).attr('href', 'home.html');
    } else {
      // No user is signed in.
    }
  });
});