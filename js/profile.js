$(document).ready(function() {
  // Declarando variables
  var $signOutBtn = $('#sign-out');
  var $username = $('.displayUsername');
  var $userEmail = $('#displayEmail');
  var $textArea = $('#write-posts');
  var $postBtn = $('#posts-btn');
  var $postsContainer = $('#posts-container');
  var $likeBtn = $('.like-btn');
    
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
  $postBtn.on('click', sharePost);
  // Evento al boton de CERRAR SESION
  $signOutBtn.on('click', signingOut);
  displayInfo();
  console.log(name);
  
  // Funciones
  
  function displayInfo() {
    $username.text(name);
    $userEmail.text(email);
  }

  // Previniendo que el formulario se envie (que no refresque la página)
  $('#create-post').submit(function() {
    return false;
  });

  // Asociando evento al text area
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

  // Funcion para postear lo que se escriba en el text area
  function sharePost(event) {
    console.log('ye!');
    console.log($textArea.val());
    if ($textArea.val()) {
      $postsContainer.prepend('<div class="card mt-3"><div class="card-header"><small>Publicado por</small>Usuario</div><div class="card-body" id="appendLike"><p class="card-text new-post"></p></div></div>');
      $('.new-post').first().append($textArea.val());
      $('#appendLike').append('<button class="btn btn-secondary like-btn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>Me gusta</button>');
      $textArea.val('');
      $textArea.focus();
    } 
  }

  $likeBtn.on('click', function() {
    console.log('hey!');
    $likeBtn.toggleClass('btn-primary').toggleClass('btn-secondary');
  });
});