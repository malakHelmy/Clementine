
const express = require('express');
const User = require('../models/user');
const router = express.Router();




router.get('/', async (req, res) => {
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



router.delete('/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    await User.findByIdAndRemove(customerId);
    res.json({ message: 'Customer deleted successfully.' });
  } catch (error) {
    console.log('Error deleting customer:', error);
    res.status(500).json({ error: 'Sorry, an error occured. Please try again.' });
  }
});

router.get('/:id', (req, res) =>{
  User.findById(req.params.id)
  .then((result) => {
    res.render('pages/updatedeletecust', {
      viewTitle:'Update Customer',
      customer: result
    });
  })
  .catch((err) => {
    console.log(err);
  });
});



router.post('/:id/update', async (req, res) => {
  try {
    const customerId = req.params.id;
    const updates = req.body; // assuming the updated datais passed in the request body
    await User.findByIdAndUpdate(customerId, updates);
    res.redirect('/editcustdash');
  } catch (error) {
    console.log('Error updating customer:', error);
    res.redirect('/editcustdash');
  }
});





module.exports = router;