$(document).ready(function () {
    $("#email").on('keyup', function (e) {
        e.preventDefault();
        var data = $('#email').val();
        $.ajax({
            url: '/user/checkemail',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: data }),
            success: function (response) {
                $('#emaillabel').html('Email is ' + response);

                if (response == 'taken') {
                    $('#emaillabel').css("color", "red");
                }
                else {
                    $('#emaillabel').css("color", "green");
                }
            },
            error:function(err){

            }
        });
    });
});

$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();
        var data = { 
         firstname:  $('#firstname').val(),
         lastname: $('#lastname').val(),
         email: $('#email').val(),
         password: $('#password').val(),
         confirmpassword: $('#confirmpassword').val(),
         phone:$('#phone').val()
    };
        $.ajax({
            url: '/user',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs: data }),
            success: function (response) {
                $('#emaillabel').html('Email is ' + response);

                if (response == 'taken') {
                    $('#emaillabel').css("color", "red");
                }
                else {
                    $('#emaillabel').css("color", "green");
                }
            },
            error:function(err){

            }
        });
    });
});
