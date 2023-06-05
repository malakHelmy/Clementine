
console.log('yes')

$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();
        var data ={password:$('#password').val(),
        confirmpassword:$('#confirmpassword').val()
        } 

        $.ajax({
            url: '/login/newpassword',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs:data}),
            success: function (response) {
                console.log(response)
                if (response == 'done') {
                    $.ajax({
                        url: '/login',
                        method: 'GET',
                        success: function (response) {
             
                            window.location.href = '/login';

                        },
                        error:function(err){
                        }
                    });
                }
                else{

                    if(response.passerror != undefined)
                    {
                           $('#passlabel').html( response.passerror);
                    }
                    else{
                       $('#passlabel').html( '');

                    }     
                    if(response.confirmerror != undefined)
                    {
                           $('#confirmpasslabel').html( response.confirmerror);
                    }
                    else{
                       $('#confirmpasslabel').html( '');

                    }       
                 
                }




            },
            error:function(err){

            }
        });
    });
});
   
