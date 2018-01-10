window.onload = begin;
var file;
var storageRef;
var uploadMessage;
var postedImagesRef;
var $postsContainer = $('#posts-container');

function begin() {
  uploadMessage = $('#upload-msg');

  file = document.getElementById('file');
  file.addEventListener('change', selectFile, false);

  // Create a root reference
  storageRef = firebase.storage().ref();

  postedImagesRef = firebase.database().ref().child('postedImages');
}

function selectFile(event) {
  var selectedFile = file.files[0];

  var uploadTask = storageRef.child('postedImages/' + selectedFile.name).put(selectedFile);  

  uploadTask.on('state_changed', function(snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
    }
  }, function(error) {
  // Handle unsuccessful uploads
  }, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    var downloadURL = uploadTask.snapshot.downloadURL;
    console.log('subio imagen');
    createNode(selectedFile.name, downloadURL);
    uploadMessage.text('Gracias por compartir :)');
    setTimeout(function() {
      uploadMessage.text(' ');
    }, 1000);
    $postsContainer.prepend('<div class="card del-post mt-3"><div class="card-header btn-yellowLab"><small>Publicado por</small> Usuario</div><div class="card-body" id="appendLike"><p class="card-text new-post"></p></div></div>');
    $('.new-post').first().html('<img src="' + downloadURL + '" class="img-fluid">');
    $('#appendLike').append('<button class="btn btn-secondary like-btn"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>Me gusta</button>');
    $('.card-header').first().prepend('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
  });
}

function createNode(imageName, downloadUrl) {
  postedImagesRef.push({
    name: imageName,
    url: downloadUrl
  });
}