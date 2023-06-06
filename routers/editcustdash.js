
const express = require('express');
const User = require('../models/user');
const router = express.Router();



router.get('/', async (req, res) => {

if(req.session.admin != undefined){
 User.find()
    .then(async (customerslist) => {
      res.render('pages/editcustdash', {
        viewTitle: "Customers",
        users: customerslist,
        isadmin:req.session.admin
      });
    })
    .catch((err) => {
      console.log(err);
    });

  
}else{
  res.render('pages/404');
}
 
  });


router.post('/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    await User.findOneAndDelete({ _id: customerId });
    console.log(customerId);
    if (req.query.ajax)
      return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log('Error deleting customer:', error);
    res.status(500)
      .json({ error: 'Failed to delete customer, please try again.' });
  }

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



router.post('/:id/update', async (req, res) => {
  try {
    const customerId = req.params.id;
    const updates = req.body;
    await User.findByIdAndUpdate(customerId, updates);
    res.redirect('/editcustdash');
  } catch (error) {
    console.log('Error updating customer:', error);
    res.redirect('/editcustdash');
  }
});





module.exports = router;