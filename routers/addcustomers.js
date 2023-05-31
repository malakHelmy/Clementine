
const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.post('/', async (req, res) => {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.pass,
      phone: req.body.phone
    };
    const users = new User(user);
    users
      .save()
      .then((result) => {
        res.redirect('/editcustdash');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router;
