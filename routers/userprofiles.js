const express = require('express');
const Order = require('../models/order');
//const { OrderItem } = require('../models/order-items');
const router = express.Router();

router.get(`/`, async (req, res) => {

  Order.find()
  .then(async (orderslist) => {          
  res.render('pages/userprofile', {
    order: orderslist
  })

  })
  .catch((err) => {
      
    console.log(err);
  });
});


module.exports = router;
