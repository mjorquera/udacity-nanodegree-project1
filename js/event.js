$(document).ready(function() {

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
