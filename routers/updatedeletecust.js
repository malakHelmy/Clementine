/*const express = require('express');
const router = express.Router();
const User = require('../models/user').User;

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
  

router.get('/:id', async (req, res) => {
    try {
      const customerId = req.params.id;
      const customer = await User.findById(customerId);
      res.render('pages/updatedeletecust', { customer });
    } catch (error) {
      console.log('Error fetching customer:', error);
      res.redirect('/customers');
    }
  });
  

// POST route for updating the user
/* router.post('/:id', async (req, res) => {
  try {
    const userid = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { id: userid },
      updatedUserData,
      { new: true }
    );
    if (updatedUser) {
      console.log('Updated Customer data:', updatedUser);
      res.redirect('/editcustdash');
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
*/