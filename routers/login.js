const express = require('express');
const session = require('express-session');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get(`/`, function (req, res) {
   
        res.render('pages/login');   
    
});

// router.post(`/`, async (req, res) => {

//     User.find(req.body.email)
//     .then( async (result) => { 
//         let x= await bcrypt.compare(req.body.password, result.password) ;
         
//         console.log(x)
//         res.render('pages/index')
         
//     }
//     )
//     .catch((err) => {
//       console.log(err); 
//     });

// });

 router.post(`/`, async (req, res) => {
    
            
     const result= await User.findOne({email:req.body.email});
     if( result )
     {
             if( await bcrypt.compare(req.body.password, result.password)) 
             {
                 res.render('pages/index')
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
