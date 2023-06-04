const form=document.getElementById('signInform');
const firstname=document.getElementById('firstname');
const lastname=document.getElementById('lastname');
const email=document.getElementById('email');
const pass=document.getElementById('pass');
const confpass=document.getElementById('confirmpass');
const phone=document.getElementById('phone');

function checkinputs()
{
const firstnamevalue=firstname.value.trim();
const lastnamevalue=lastname.value.trim();
const passvalue=pass.value.trim();
const confirmpassvalue=confpass.value.trim();
const phonevalue=phone.value.trim();
const emailvalue=email.value;
let c=0;
if(firstnamevalue=='')
{
  const l=document.getElementById('firstnamelabel');
  const formc=firstname.parentElement;
  formc.className='textfield failed';
  l.innerHTML='Please enter firstname';
   c++;
}
else{
  const formc=firstname.parentElement;
  const l=document.getElementById('firstnamelabel');
  formc.className='textfield success';
  l.innerHTML='';
 
}

if(lastnamevalue=='')
{
  const l=document.getElementById('lastnamelabel');
  const formc=lastname.parentElement;
  formc.className='textfield failed';
  l.innerHTML='Please enter lastname';
  c++;
}
else{
  const formc=lastname.parentElement;
  const l=document.getElementById('lastnamelabel');
  formc.className='textfield success';
  l.innerHTML='';
  
}

if(emailvalue=='')
{
  const l=document.getElementById('emaillabel');
  const formc=email.parentElement;
  formc.className='textfield failed';
  l.innerHTML='Please enter your mail';
  c++;
}
else{
  const formc=email.parentElement;
  const l=document.getElementById('emaillabel');
  formc.className='textfield success';
  l.innerHTML='';
 
}

 if(passvalue=='' )
{
  const l=document.getElementById('passlabel');
  const formc=pass.parentElement;
  formc.className='textfield failed';
  l.innerHTML='Please enter password';
  c++;
}
else{
  const l=document.getElementById('passlabel');
  const formc=pass.parentElement;
  formc.className='textfield success';
  l.innerHTML='';

}
if(confirmpassvalue==''){
  const l=document.getElementById('confirmpasslabel');
  const formc=confpass.parentElement;
  formc.className='textfield failed';
  l.innerHTML='Please enter password';
  c++;
}
else if(confirmpassvalue!=passvalue)
{
  const l=document.getElementById('confirmpasslabel');
  const formc=confpass.parentElement;
  formc.className='textfield failed';
  l.innerHTML='Please enter matching password';
  c++;
}
else if(confirmpassvalue==passvalue)
{
  const l=document.getElementById('confirmpasslabel');
  const formc=confpass.parentElement;
  formc.className='textfield success';
  l.innerHTML='';
}
if(phonevalue.length==11)
{
  const l=document.getElementById('phonelabel');
  const formc=phone.parentElement;
  formc.className='textfield success';
  l.innerHTML='';
}
else
{
  const l=document.getElementById('phonelabel');
  const formc=phone.parentElement;
  formc.className='textfield failed';
  l.innerHTML='Please insert right phone number';
  c++;
}
if(c==0)
return true;
else
return false;
}
////////////////////////////////////////
$(document).ready(function () {
  $("#email").on('keyup', function (e) {
      e.preventDefault();
      var data = $('#email').val();console.log(data)
      $.ajax({
          url: '/customers/checkemail',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ email: data }),
          success: function (response) {
              console.log(response)
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
////////////////////////////////////////
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
          url: '/customers',
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
                  c++;
               }else{

                  $('#phonelabel').html( '');
                  const pass=document.getElementById('phone');
                  const formc= pass.parentElement;
                  formc.className='textfield success';
               }
               if(response.emailerror != undefined)
               {
                  $('#emaillabel').html(response.emailerror);
                  const pass=document.getElementById('email');
                  const formc= pass.parentElement;
                  formc.className='textfield failed';
                  c++;
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




