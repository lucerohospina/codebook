$(document).ready(function() {
  // Declarando variables
  var $signOutBtn = $('#sign-out');
  var $textArea = $('#write-posts');
  var $postBtn = $('#posts-btn');
  var $postsContainer = $('#posts-container');
  var $likeBtn = $('.like-btn');

  // Asociando eventos
  $postBtn.on('click', sharePost);
  // Evento al boton de CERRAR SESION
  $signOutBtn.on('click', signingOut);
  
  // Funciones
  function signingOut() {
    console.log('click');
    firebase.auth().signOut().then(function() {
      console.log('Saliendo...');
    })
      .catch(function() {
        console.log('Error');
      });
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