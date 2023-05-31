const express = require('express');
const Employer = require('../models/employer');
const bcrypt=require('bcrypt')
const router = express.Router();



//handling the form submission
router.post('/', (req, res) => {
  const { name, email, password, phone, isAdmin } = req.body;

  const newEmployer = new Employer({
    name,
    email,
    password,
    phone,
    isAdmin: Boolean(isAdmin)
  });

  newEmployer.save()
    .then(() => {
      res.redirect('/employersdash'); 
    })
    .catch((error) => {
      res.render('error.ejs', { error }); 
    });
});


module.exports = router;
