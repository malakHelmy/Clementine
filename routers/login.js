const express = require('express');
const session = require('express-session');
const  Cart  = require('../models/cart');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get(`/`, function (req, res) {

    res.render('pages/login', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart
    });
    
});

 router.post(`/`, async (req, res) => {
    
            
     const result= await User.findOne({email:req.body.email});
     if( result )
     {
             if( await bcrypt.compare(req.body.password, result.password)) 
             {
               req.session.user=req.body.email;
                    if(req.session.cart!=undefined)
               req.session.cart.items.forEach((items) => {
                 items.email=req.session.user;
               });  
               
                const result= await Cart.find({email:req.body.email})
               console.log(result)
               if(result!=undefined &&  req.session.cart!=undefined )
               {
                   result.forEach((items)=>{
                    req.session.cart.items.push(items);
                   })
               }

               res.redirect('/')
             } 
             else
             {
               res.render('pages/login',{
                user: req.session.user == undefined ? undefined : req.session.user,
                cart: req.session.cart == undefined ? undefined : req.session.cart
             })
             }
     }
     else
     {
        res.render('pages/login')
     }
     
 });

module.exports = router;
