$(document).ready(function() {

  $("#password").popover({
        placement: "bottom",
        content: "It's so simple to create a tooltop for my website!" })
        .on("click focus",function(){
            $(this).popover('show');
        })
        .blur(function () {
            $(this).popover('hide');
        });

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

  $("#sigup-form").on("submit", function(e){
    var user = getFormData($(this).serializeArray());
    console.log(user);
    e.preventDefault();
    firebase.database().ref('users/').push(user);
    notifySuccess();
    $(this).trigger("reset");
    return true;
  });
})
