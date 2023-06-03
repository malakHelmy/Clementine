const express = require('express');
const Employer = require('../models/employer');
const bcrypt=require('bcrypt')
const router = express.Router();



//handling the form submission
router.post('/',async (req, res) => {
  const { name, email, password, phone, isAdmin } = req.body;


  const user={
    name:req.body.name,
    email:req.body.email,
    password: await bcrypt.hash(req.body.password,12),
    phone:req.body.phone,
    isAdmin:Boolean(isAdmin)
  }

   
  const newEmployer = new Employer(user);

  newEmployer.save()
    .then(() => {
      res.redirect('/employersdash'); 
    })
    .catch((error) => {
      res.render('error.ejs', { error }); 
    });
});


module.exports = router;
