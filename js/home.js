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
      var uid = user.uid;

      $username.text(name);
      $userEmail.text(email);
      if (user.photoUrl) {
        $profilePhoto.attr('src', photoUrl);
      } else {
        $profilePhoto.attr('src', 'https://firebasestorage.googleapis.com/v0/b/codebook-cd8c9.appspot.com/o/postedImages%2Fdefault.jpg?alt=media&token=5897a927-f9b6-4ded-9331-0dc8032ae325');
      }
      
    } else {
      // No user is signed in.
    }
  });

  // Previniendo que el formulario se envie (que no refresque la página)
  $('#create-post').submit(function() {
    return false;
  });

  // Publicar un post
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
  
  function sharePost() {
    console.log($textArea.val());
    firebase.auth().onAuthStateChanged(function(user) {
      if (user && $textArea.val()) {
        var name = user.displayName;
        var msg = $textArea.val();
        var like = 

        $textArea.focus();
        $postBtn.attr('disabled', true);

        firebase.database().ref('posts/').push({
          name: user.displayName,
          message: $textArea.val(),
          likeState: $('.btn-like').hasClass('btn-secondary')
        });
      }
      $textArea.val('');
    });
  }

  firebase.database().ref('posts/')
    .on('value', function(snapshot) {
      var htmlPost = '';
      snapshot.forEach(function(el) {
        var element = el.val();
        var namePost = element.name;
        var messagePost = element.message;
        htmlPost = '<div class="card del-post mt-3"><div class="card-header btn-yellowLab"><small>Publicado por</small> <span>' + namePost + '</span> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="card-body" id="appendLike"><p class="card-text new-post rounded-corners">' + messagePost + '</p><button class="btn btn-secondary like-btn rounded-corners"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>Me gusta</button></div></div>';

        if (element.likeState === true) {
          $('.btn-like').addClass('btn-secondary');
        }

        $postsContainer.prepend(htmlPost);
      });
    });

  $(document).on('click', '.like-btn', function() {
    console.log('click success!');
    $(this).toggleClass('btn-primary').toggleClass('btn-secondary').toggleClass('font-weight-bold');
  }); 

  $(document).on('click', '.close', function() {
    console.log('close-click');
    $(this).parent().parent().remove();
  });
});
