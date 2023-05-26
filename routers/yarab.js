
const express = require('express');
const Order = require('../models/order');
const router = express.Router();



router.get(`/`, async (req, res) => {

    Order.find()
    .then(async (orderslist) => {          
    res.render('pages/editcustdash', {
      order: orderslist
    })

    })
    .catch((err) => {
        
      console.log(err);
    });
  });


  module.exports = router;
