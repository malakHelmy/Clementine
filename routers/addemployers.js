const express = require('express');
const Employer = require('../models/employer');
const bcrypt=require('bcrypt')
const router = express.Router();

// Route for displaying the addemployers.ejs form
router.get('/addemployers', (req, res) => {
  res.render('addemployers.ejs');
});

// Route for handling the form submission
router.post('/addemployers', (req, res) => {
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
      res.redirect('/dashboard'); 
    })
    .catch((error) => {
      res.render('error.ejs', { error }); 
    });
});


module.exports = router;
