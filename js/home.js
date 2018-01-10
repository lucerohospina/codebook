$(document).ready(function() {
  var $username = $('.displayUsername');
  var $userEmail = $('#displayEmail');
  var $profilePhoto = $('#profile-photo');
  var $textArea = $('#write-posts');
  var $postBtn = $('#posts-btn');
  var $postsContainer = $('#posts-container');

  $postBtn.on('click', sharePost);

  // Obteniendo datos del usuario actual
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      var emailVerified = user.emailVerified;
      var uid = user.uid;
      console.log(user);
      $username.text(name);
      $userEmail.text(email);
      $profilePhoto.attr('src', photoUrl);
    } else {
      // No user is signed in.
    }
  });
  
  $textArea.on('keyup', function() {
    if ($textArea.val()) {
      $postBtn.removeAttr('disabled');
      $postBtn.css({'background': '#f7b617',
        'color': '#2b2b2b',
        'border': 'none'});
    } else {
      $postBtn.attr('disabled', true);
    }
  });
  

  // function activeBtn() {
  //   if ($textArea.val()) {
  //     $postBtn.removeAttr('disabled');
  //     $postBtn.css({ 'background': '#f7b617'});
  //   }
  // }

  // function inactiveBtn() {
  //   $postBtn.attr('disabled', true);
  //   $postBtn.css({ 'background': '#fff'});
  // }
  
  function sharePost() {
    console.log('ye!');
    console.log($textArea.val());
    if ($textArea.val()) {
      $postsContainer.prepend('<div class="new-post card"></div>');
      $('.new-post').first().append($textArea.val());
      $textArea.val('');
      $textArea.focus();
    } 
  }
});
  