$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();
        console.log($('#email').val());
        console.log($('#password').val());
        var data ={email: $('#email').val(),
        password: $('#password').val()
    };
        $.ajax({
            url: '/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs: data }),
            success: function (response) {

                if(response=='true'){
                    $.ajax({
                        url: '/',
                        method: 'GET',
                        success: function (response) {
                            window.location.href = '/';
                        },
                        error:function(err){
                        }
                    });
                }

                if (response == 'taken') {
                    $('#emaillabel').html('Email already exists ');
                    $('#emaillabel').css("color", "red");
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
                    $('#emaillabel').css("color", "red");
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
   