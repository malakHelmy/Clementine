
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const customersController= require('../controllers/customersController');

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



router.get(`/`, async (req, res) => {
  User.find()
    .then(async (customerslist) => {
      res.render('pages/editcustdash', {
        viewTitle: "Customers",
        users: customerslist
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render('pages/updatedeletecust', {
        viewTitle: 'Update Customer',
        customer: result
      });
    })
    .catch((err) => {
      console.log(err);
    });
});



router.post('/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    await User.findByIdAndRemove(customerId);
    res.redirect('/editcustdash');
  } catch (error) {
    console.log('Error deleting customer:', error);
    res.redirect('/editcustdash');
  }
});
module.exports = router;
