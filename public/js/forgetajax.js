$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();
        var data = $('#email').val();
        $.ajax({
            url: '/login/resetpassword',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: data }),
            success: function (response) {

                if (response == 'done') {
                    $('#emaillabel').html('Successful! please your email inbox ');
                    $('#emaillabel').css("color", "green");
                }
                else{
                    $('#emaillabel').html('Email is Invalid');
                    $('#emaillabel').css("color", "red");          
                 }
            },
            error:function(err){

            }
        });
    });
});
   
