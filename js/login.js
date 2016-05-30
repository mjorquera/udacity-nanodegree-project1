$(document).ready(function() {
    $("#login-form").on("submit", function(e){
      var user = {
        "email": $("#email").val(),
        "password": $("#password").val()
      }
      e.preventDefault();
      firebase.database().ref('users/').push(user);
      window.location = "/event.html";
    });
});
