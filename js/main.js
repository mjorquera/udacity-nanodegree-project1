$(document).ready(function() {

  var firstPasswordInput = document.querySelector("#password");
  var secondPasswordInput = document.querySelector("#password2");
  var submit = document.querySelector("#submitSignUp");

  function notifySuccess(){
    $.notify(
      { icon: 'glyphicon glyphicon-ok-circle',
        message: "Success! User Created."
        },{
       type: 'success',
       placement: {
          from: "top",
          align: "center"
        },
        animate: {
      		enter: 'animated slideInDown',
      		exit: 'animated slideOutUp'
      	}
      });
  }

  function getFormData(unindexed_array){
        var indexed_array = {};

        $.map(unindexed_array, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
      }

  $("#password").on("keyup", function(){

    if ($(this).val().length >= 8) {
      $("#pass-req1").addClass("pass-success");
    }
    else {
      $("#pass-req1").removeClass("pass-success");
    }

    if($(this).val().match(/\d/g)){
      $("#pass-req2").addClass("pass-success");
    }
    else {
      $("#pass-req2").removeClass("pass-success");
    }

    if($(this).val().match(/[a-z]/g)){
      $("#pass-req3").addClass("pass-success");
    }
    else {
      $("#pass-req3").removeClass("pass-success");
    }

    if($(this).val().match(/[A-Z]/g)){
      $("#pass-req4").addClass("pass-success");
    }
    else {
      $("#pass-req4").removeClass("pass-success");
    }

    if($(this).val().length > 0 && $(this).val() == $("#password2").val()){
      $("#pass-req5").addClass("pass-success");
    }
    else {
      $("#pass-req5").removeClass("pass-success");
    }
  });

  $("#password2").on("keyup",function(){
    if($(this).val().length > 0 && $(this).val() == $("#password").val()){
      $("#pass-req5").addClass("pass-success");
    }
    else {
      $("#pass-req5").removeClass("pass-success");
    }
  });

  $("#sigup-form").on("submit", function(e){

    var firstPassword = firstPasswordInput.value;
    var secondPassword = secondPasswordInput.value;

    var firstInputIssuesTracker = new IssueTracker();
    var secondInputIssuesTracker = new IssueTracker();

    function checkRequirements() {
      if (firstPassword.length < 8) {
        firstInputIssuesTracker.add("fewer than 8 characters");
      }

      if (!firstPassword.match(/\d/g)) {
        firstInputIssuesTracker.add("missing a number");
      }

      if (!firstPassword.match(/[a-z]/g)) {
        firstInputIssuesTracker.add("missing a lowercase letter");
      }

      if (!firstPassword.match(/[A-Z]/g)) {
        firstInputIssuesTracker.add("missing an uppercase letter");
      }
    };

    if (firstPassword === secondPassword && firstPassword.length > 0) {
      checkRequirements();
    } else {
      secondInputIssuesTracker.add("Passwords must match!");
    }

    var firstInputIssues = firstInputIssuesTracker.retrieve()
    var secondInputIssues = secondInputIssuesTracker.retrieve()

    firstPasswordInput.setCustomValidity(firstInputIssues);
    secondPasswordInput.setCustomValidity(secondInputIssues);

    if (firstInputIssues.length + secondInputIssues.length > 0) {
      return false;
    }
    var user = getFormData($(this).serializeArray());
    console.log(user);
    e.preventDefault();
    firebase.database().ref('users/').push(user);
    notifySuccess();
    $(this).trigger("reset");
    return true;
  });
})

function IssueTracker() {
  this.issues = [];
}

IssueTracker.prototype = {
  add: function (issue) {
    this.issues.push(issue);
  },
  retrieve: function () {
    var message = "";
    switch (this.issues.length) {
      case 0:
        // do nothing because message is already ""
        break;
      case 1:
        message = "Please correct the following issue:\n" + this.issues[0];
        break;
      default:
        message = "Please correct the following issues:\n" + this.issues.join("\n");
        break;
    }
    return message;
  }
};
