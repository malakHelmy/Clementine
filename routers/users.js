
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
