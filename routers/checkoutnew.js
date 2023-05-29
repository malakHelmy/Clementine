
const express = require('express');
const  Payment = require('../models/checkout');
const  Billing = require('../models/order');
const { OrderItem } = require('../models/order-items');


const router = express.Router();

router.post(`/`, async  (req, res) => {

    const data={
     userID:req.body.userID,
     totalAmount:req.body.totalAmount,
     exp_month:req.body.exp_month,
     exp_year:req.body.exp_year,
     cvv:req.body.cvv
    }
    const paymentdetails=new Payment(data);
    paymentdetails
    .save()
    .then( (result) => {
        res.render('pages/checkout');
    })
    .catch( err => {
      console.log(err);
    });
});




module.exports = router;
