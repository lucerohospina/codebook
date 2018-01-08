$(document).ready(function() {
  $('.redirect').click(goTo);

  function goTo(event) {
    $('body').fadeOut(1000, function() {
      location.attr('href', $(event.target).attr('data-target') + '.html');
    });
  }
});