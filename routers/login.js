const express = require('express');
const session = require('express-session');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get(`/`, function (req, res) {
   

    res.render('pages/login', {
        user: req.session.user === undefined ? '' : req.session.user,
    });

    
});

 router.post(`/`, async (req, res) => {
    
            
     const result= await User.findOne({email:req.body.email});
     if( result )
     {
             if( await bcrypt.compare(req.body.password, result.password)) 
             {

               req.session.user=req.body.email;
               res.render('pages/index', {
               user: req.session.user == undefined ? '' : req.session.user,
            });
             } 
             else
             {
               res.render('pages/login')
             }
     }
     else
     {
        res.render('pages/login')
     }
     
 });

module.exports = router;
