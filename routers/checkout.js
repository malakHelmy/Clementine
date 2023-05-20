const express = require('express');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const { PaymentDetails } = require('../models/paymentgateway');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post(`/`, async  (req, res) => {

        const data={
         userID:req.body.userID,
         totalAmount:req.body.totalAmount,
         exp_month:req.body.exp_month,
         exp_year:req.body.exp_year,
         CreditCardNumber: await bcrypt.hash(req.body.CreditCardNumber,12),
         cvv:req.body.cvv
        }
        const paymentdetails=new PaymentDetails(data);
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


