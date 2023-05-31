const express = require('express');
const  User  = require('../models/user');
const bcrypt=require('bcrypt')
const router = express.Router();
router.post(`/`, async  (req, res) => {

  const firstnamevalue=req.body.inputs.firstname;
  const lastnamevalue=req.body.inputs.lastname;
  const passvalue=req.body.inputs.password;
  const confirmpassvalue=req.body.inputs.confirmpassword;
  const phonevalue=req.body.inputs.phone;
  const emailvalue=req.body.inputs.email;

 
  let c=0;
  let Error={
    firsterror:String,
    lasterror:String,
    emailerror:String,
    passerror:String,
    confirmpasserror:String,
    phoneerror:String
  }
  if(firstnamevalue=='')
  {
    Error.firsterror='Please enter Firstname';
     c++;
  }
  
  if(lastnamevalue=='')
  {
    Error.lasterror='Please enter Lastname';
    c++;
  }
  else{

  }
  
  if(emailvalue=='')
  {
    Error.emailerror='Please enter Email';
    c++;
  }
  else{
 
  } 
   if(passvalue=='' )
  {
    Error.passerror='Please enter Password';
    c++;
  }
  else{
  }
  if(confirmpassvalue==''){
    Error.confirmpasserror='Please enter Confirm Password';
    c++;
  }
  else if(confirmpassvalue!=passvalue)
  {
    Error.confirmpasserror='Please enter Matching Password';
    c++;
  }
  else if(confirmpassvalue==passvalue)
  {
  }
  if(phonevalue.length==11 && !isNaN(phonevalue))
  {
    Error.phoneerror='Please enter right phone number';
  }
  else
  {
    Error.phoneerror='Please enter right phone number';
    c++;
  }
  console.log(Error);
 
        if(c==0)
        {
          const user={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password: await bcrypt.hash(req.body.password,12),
            phone:req.body.phone
          }
          const users=new User(user);
         const check= User.findOne({email:req.body.email}).then((result)=>{
            if(result==undefined)
            {
              users
              .save()
              .then( (result) => {
                 
                req.session.user=req.body.email;
                if(req.session.cart!=undefined)
                req.session.cart.items.forEach((items) => {
                  items.email=req.session.user;
                });  
                res.redirect('/')
              })
              .catch( err => {
                console.log(err);
              });
            } 
            else{

              res.render('pages/signup',{ user: req.session.user == undefined ? undefined : req.session.user,
              cart: req.session.cart == undefined ? undefined : req.session.cart,
               error:Error
            })

            }               
         }).catch( err => {
          console.log(err);
        });
        }
        else{
          res.render('pages/signup',{ user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart == undefined ? undefined : req.session.cart, 
            error:Error
          })
        }
       

});






router.post(`/checkemail`, async  (req, res) => {
  var query = { email: req.body.email };
  User.find(query)
      .then(result => {
          if (result.length > 0) {
              res.send('taken');
          }
          else {
              res.send('available');
          }
      })
      .catch(err => {
          console.log(err);
      });
});


module.exports = router;