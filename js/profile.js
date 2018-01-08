$(document).ready(function() {
  // Declarando variables
  var $signOutBtn = $('#sign-out');

  // Asociando eventos

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
});