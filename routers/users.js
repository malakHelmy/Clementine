
const express = require('express');
const  User  = require('../models/user');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post(`/`, async  (req, res) => {

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
            res.render('pages/signup')
          }               
       
       }).catch( err => {
        console.log(err);
      });
         

    
});

module.exports = router;
