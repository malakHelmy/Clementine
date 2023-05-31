$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();
        const data = { 
         firstname:  $('#firstname').val(),
         lastname: $('#lastname').val(),
         email: $('#email').val(),
         password: $('#password').val(),
         confirmpassword: $('#confirmpassword').val(),
    };

        console.log(data)

        $.ajax({
            url: '/user',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs: data }),
            success: function (response) {
                $('#emaillabel').html(response.emailerror);
                $('#passlabel').html( response.passerror);
                $('#firstnamelabel').html( response.firsterror);
               $('#confirmpasslabel').html( response.confirmpasserror);
               $('#lastnamelabel').html( response.lasterror);
               console.log(response)
                // if (response == 'taken') {
                //     $('#emaillabel').css("color", "red");
                // }
                // else {
                //     $('#emaillabel').css("color", "green");
                // }
            },
            error:function(err){

            }
        });
    });
});
