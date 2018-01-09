// $(document).ready(function() {
//   $('.redirect').click(goTo);

//   function goTo(event) {
//     $('body').fadeOut(1000, function() {
//       location.attr('href', $(event.target).attr('data-target') + '.html');
//     });
//   }
// });

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAuWjgjDXgNHkKnscxwhVpSK6G_p-IZX2s",
  authDomain: "codebook-cd8c9.firebaseapp.com",
  databaseURL: "https://codebook-cd8c9.firebaseio.com",
  projectId: "codebook-cd8c9",
  storageBucket: "codebook-cd8c9.appspot.com",
  messagingSenderId: "42664775792"
};
firebase.initializeApp(config);

