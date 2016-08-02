$(document).ready(function() {
  var startDateInput = document.querySelector("#event_start");
  var endDateInput = document.querySelector("#event_end");
  function notifySuccess(){
    $.notify(
      { icon: 'glyphicon glyphicon-ok-circle',
        message: "Success! Event Created."
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

  $("#event_start").blur(function(){
    var startDate = new Date(startDateInput.value);
    var startDateIssuesTracker = new IssueTracker();
    if(startDate < new Date()){
      startDateIssuesTracker.add("The start date can't be in the past.");
    }
    var startDateIssues = startDateIssuesTracker.retrieve();
    startDateInput.setCustomValidity(startDateIssues);
  });

  $("#event_end").blur(function(){
    var startDate = new Date(startDateInput.value);
    var endDate = new Date(endDateInput.value);

    var endDateIssuesTracker = new IssueTracker();

    if(startDate > endDate){
      endDateIssuesTracker.add("The end date must be after the start date.");
    }

    var endDateIssues = endDateIssuesTracker.retrieve();

    endDateInput.setCustomValidity(endDateIssues);
  });

  $("#event_form").on("submit", function(e){
    var event = getFormData($(this).serializeArray());
    e.preventDefault();
    firebase.database().ref('events/').push(event);
    notifySuccess();
    $(this).trigger("reset");
    return true;
  });

  var eventViewModel = new EventViewModel();

  firebase.database().ref('events/').orderByChild('event_start').on('child_added', function(data){
    eventViewModel.event.push(data.val());
  });

  ko.applyBindings(eventViewModel);
});

var EventViewModel = function(){
  this.event = ko.observableArray();
}

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
