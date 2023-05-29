const express = require('express');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const { OrderItem } = require('../models/order-items');
const router = express.Router();




router.get(`/`, async (req, res) => {

    Order.find()
    .then(async (orderslist) => {          
    res.render('pages/ordersdash', {
      order: orderslist
    })

    })
    .catch((err) => {
        
      console.log(err);
    });
  });


module.exports = router;
