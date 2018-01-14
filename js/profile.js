$(document).ready(function() {
  // Declarando variables
  var $signOutBtn = $('#sign-out');
  var $textArea = $('#write-posts');
  var $postBtn = $('#posts-btn');
  var $postsContainer = $('#posts-container');

  // Asociando eventos
  $postBtn.on('click', sharePost);
   
  // Funciones
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
      $postsContainer.prepend('<div class="card del-post mt-3"><div class="card-header btn-yellowLab"><small>Publicado por</small> Usuario</div><div class="card-body" id="appendLike"><p class="card-text new-post"></p></div></div>');
      $('.new-post').first().append($textArea.val());
      $('#appendLike').append('<button class="btn btn-secondary like-btn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>Me gusta</button>');
      $('.card-header').first().prepend('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
      $textArea.val('');
      $textArea.focus();
      $postBtn.attr('disabled', true);
    } 
  }

  $(document).on('click', '.like-btn', function() {
    console.log('click success!');
    $(this).toggleClass('btn-primary').toggleClass('btn-secondary').toggleClass('font-weight-bold');
  }); 

  $(document).on('click', '.close', function() {
    console.log('close-click');
    $(this).parent().parent().remove();
  });
});

