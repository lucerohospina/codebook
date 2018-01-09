$(document).ready(function() {
  var $textArea = $('#write-posts');
  var $postBtn = $('#posts-btn');
  var $postsContainer = $('#posts-container');

  $postBtn.on('click', sharePost);

  function sharePost() {
    console.log('ye!');
    console.log($textArea.val());
    $postsContainer.append($textArea.val());
  }
});
  