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
                if (response == 'taken') {
                    $('#emaillabel').html('Email already exists ');
                    const pass=document.getElementById('email');
                    const formc=pass.parentElement;
                    formc.className='textfield failed';
                }
                 else if(response == 'available'){
                      $('#emaillabel').html('Email is available');
                      $('#emaillabel').css("color", "green");
                      const pass=document.getElementById('email');
                      const formc=pass.parentElement;
                      formc.className='textfield success';
                 }else{
                    $('#emaillabel').html('Email is Invalid');
                    const pass=document.getElementById('email');
                    const formc=pass.parentElement;
                    formc.className='textfield failed';

                 }
             
            },
            error:function(err){

            }
        });
    });
});
   