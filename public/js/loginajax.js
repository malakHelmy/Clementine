$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();
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

                if (response.emailerror != undefined) {
                    $('#emaillabel').html(response.emailerror);
                    $('#emaillabel').css("color", "rgb(97, 9, 9)");
                    const pass=document.getElementById('email');

                    const formc=pass.parentElement;
                    formc.className='textfield failed';
                }else{
                    $('#emaillabel').html('');
                    $('#emaillabel').css("color", "green");
                    const pass=document.getElementById('email');
                    const formc=pass.parentElement;
                    formc.className='textfield success';
                }

                 if(response.Passerror != undefined){
                      $('#passlabell').html(response.Passerror);
                   
                      const pass=document.getElementById('password');
                      const formc=pass.parentElement;
                      formc.className='textfield failed';
                 }
             
            },
            error:function(err){

            }
        });
    });
});
   