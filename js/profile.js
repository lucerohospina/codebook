$(document).ready(function() {
  // Declarando variables
  var $signOutBtn = $('#sign-out');
  var $textArea = $('#write-posts');
  var $postBtn = $('#posts-btn');
  var $postsContainer = $('#posts-container');
  var $counter = $('.counter');
  

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
      $postsContainer.prepend('<div class="card del-post rounded-corners mt-3"><div class="card-header btn-yellowLab"><span>Compartiste:</span><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="card-body" id="appendLike"><p class="card-text new-post rounded-corners"></p><div class="card-footer"><button class="btn btn-secondary like-btn rounded-corners"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>Me gusta</button><span class="counter">0</span><br><small class="moment-custom-xs moment-custom"> ' + moment().format('MMMM Do YYYY, hh:mm a') + '</small></div></div></div>');
      $('.new-post').first().append($textArea.val());
      // $('#appendLike').append('<button class="btn btn-secondary like-btn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>Me gusta</button>');
      // $('.card-header').first().prepend('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
      
      // agrega formato de hora
      //  $('.card-header').first().append('<i> Publicado: ' + moment().format('hh:mm') + '</i>');
       
      $textArea.val('');
      $textArea.focus();
      $postBtn.attr('disabled', true);
    } 
  }

  $(document).on('click', '.like-btn', function() {
    var min = 0;
    console.log('click success!');
    console.log(min++);
    $(this).toggleClass('btn-primary').toggleClass('btn-secondary').toggleClass('font-weight-bold');
    $counter.text(min++);
  }); 

  $(document).on('click', '.close', function() {
    console.log('close-click');
    $(this).parent().parent().remove();
  });
});