const express = require('express');
const Order = require('../models/order');
//const { OrderItem } = require('../models/order-items');
const router = express.Router();

router.post(`/`, async(req, res)=>{
    const order = {
      
        status: req.body.status,
        userID: req.body.userID,
        orderItems: req.body.orderItems,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        status: req.body.status,
        totalAmount: req.body.totalAmount,
        phone_num: req.body.phone_num,
        dateOrdered: req.body.dateOrdered
    }   
    const orders = new Order(order);
    orders
    .save()
    .then((result) => {
      console.log('aho')
      res.render('pages/userprofile');
    })
    .catch(err => {
      console.log(err);
    });
});

router.get(`/`, async(req, res)=>{
    Order.find()
        .then(async(result)=> {
            res.render('pages/userprofile', {
              orders: result,

            })
        })
        .catch((err) => {
        
            console.log(err);
          });
});

module.exports = router;
