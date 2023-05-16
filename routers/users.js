
const express = require('express');
const  User  = require('../models/user');
const router = express.Router();

router.post(`/`,   (req, res) => {
    const users=new User(req.body);
   
    users
        .save( )
        .then( result => {
            res.render('pages/index');
        })
        .catch( err => {
          console.log(err);
        });
});

module.exports = router;
