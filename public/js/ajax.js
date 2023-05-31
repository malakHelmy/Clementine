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
