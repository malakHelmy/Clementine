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

