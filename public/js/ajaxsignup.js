$(document).ready(function () {
    $("#signInform").on('submit', function (e) {
        e.preventDefault();
        const data = { 
         firstname:  $('#firstname').val(),
         lastname: $('#lastname').val(),
         email: $('#email').val(),
         password: $('#password').val(),
         confirmpassword: $('#confirmpassword').val(),
         phone: $('#phone').val()
    };
    let c=0;
        $.ajax({
            url: '/user',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ inputs: data }),
            success: function (response) {
                 if(response.passerror != undefined)
                 {
                        $('#passlabel').html( response.passerror);
                        const pass=document.getElementById('password');
                        const formc= pass.parentElement;
                        formc.className='textfield failed';
                        c++;
                 }
                 else{
                    $('#passlabel').html( '');
                    const pass=document.getElementById('password');
                    const formc= pass.parentElement;
                    formc.className='textfield success';
                 }
            
                 if(response.firsterror != undefined)
                 {
                     $('#firstnamelabel').html( response.firsterror);
                     const pass=document.getElementById('firstname');
                     const formc= pass.parentElement;
                     formc.className='textfield failed';
                     c++;
                 }else{

                    $('#firstnamelabel').html('');
                    const pass=document.getElementById('firstname');
                    const formc= pass.parentElement;
                    formc.className='textfield success';
                 }
                 if(response.lasterror != undefined)
                 {
                    $('#lastnamelabel').html( response.lasterror);
                    const pass=document.getElementById('lastname');
                    const formc= pass.parentElement;
                    formc.className='textfield failed';
                    c++;
                 }else{

                    $('#lastnamelabel').html('');
                    const pass=document.getElementById('lastname');
                    const formc= pass.parentElement;
                    formc.className='textfield success';
                 }

                 if(response.confirmpasserror != undefined)
                 {
                    $('#confirmpasslabel').html( response.confirmpasserror);
                    const pass=document.getElementById('confirmpassword');
                    const formc= pass.parentElement;
                    formc.className='textfield failed';
                    c++;
                 }else{

                    $('#confirmpasslabel').html( '');
                    const pass=document.getElementById('confirmpassword');
                    const formc= pass.parentElement;
                    formc.className='textfield success';
                 }
                 if(response.phoneerror != undefined)
                 {
                    $('#phonelabel').html( response.phoneerror);
                    const pass=document.getElementById('phone');
                    const formc= pass.parentElement;
                    formc.className='textfield failed';
                    c++;
                 }else{

                    $('#phonelabel').html( '');
                    const pass=document.getElementById('phone');
                    const formc= pass.parentElement;
                    formc.className='textfield success';
                 }

                    if(c==0){
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

            },
            error:function(err){
            }
        });
    });
});
