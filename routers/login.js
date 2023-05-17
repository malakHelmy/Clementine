

const express = require('express');
const  User  = require('../models/user');
const bcrypt=require('bcrypt')
const router = express.Router();


router.post(`/`, async  (req, res) => {




    let x=false;
    User.find()
    .then(async (result) => {          
    result.forEach(async (items)=>{
        if(req.body.email===items.email  && await bcrypt.compare( req.body.password, items.password))
        {
            x=true;
        }
    })   
    setTimeout(() => {
        if(x==true)
        {
              res.render('pages/index')
        }
        else
        {
                res.render('pages/login')
        }
    }, 700);

    }
    )
    .catch((err) => {
        
      console.log(err);
    });

 });
    

    module.exports = router;