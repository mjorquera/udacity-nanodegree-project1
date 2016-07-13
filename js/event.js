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

  function refreshEvents(){
      return true;
  }

  $("#event-form").on("submit", function(e){
    debugger;
    var event = getFormData($(this).serializeArray());
    console.log(event);
    e.preventDefault();
    firebase.database().ref('events/').push(event);
    notifySuccess();
    $(this).trigger("reset");
    refreshEvents();
    return true;
  });
})
