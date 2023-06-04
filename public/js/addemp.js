
$(document).ready(function () {
    $("#email").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#email').val();
        $.ajax({
            url: '/addemployers/checkemail',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: data }),
            success: function (response) {
    
                if (response == 'taken') {
                    $('#emaillabel').html('Email already exists ');
                    $('#emaillabel').css("color", "red");
                  
                }
                 else if(response == 'available'){
                      $('#emaillabel').html('Email is available');
                      $('#emaillabel').css("color", "green");
                    
                 }else{
                    $('#emaillabel').html('Email is Invalid');
                    $('#emaillabel').css("color", "red");
                 }
             
            },
            error:function(err){
  
            }
        });
    });
  });