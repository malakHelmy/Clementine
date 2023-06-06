const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const Order = require('../models/order');
const PaymentGateway = require('../models/paymentgateway');
const cart = require('../models/cart');
const nodemailer = require('nodemailer');
const ejs = require('ejs');


exports.checkoutCont = asyncHandler(async (req, res, next) => {
    const { userFullName, shippingAddress1, city, state, zip, CreditCardNumber, exp_month, exp_year, cvv } = req.body;
    const cardformat = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

    const errors = {};

    if (!userFullName.trim()) {
        errors.userFullName = 'Full name is required';
    }

    if (!shippingAddress1.trim()) {
        errors.shippingAddress1 = 'Address is required';
    }

    if (!city.trim()) {
        errors.city = 'City is required';
    }

    if (!state.trim()) {
        errors.state = 'City is required';
    }

    if (!zip.trim()) {
        errors.zip = 'City is required';
    } else if (zip.length != 4) {
        errors.zip = 'Zip code must be 4 integers long.'
    }


    if (!CreditCardNumber.trim()) {
        errors.CreditCardNumber = 'Credit card number is required';
    } else if (!CreditCardNumber.match(cardformat)) {
        errors.CreditCardNumber = 'Invalid credit card number';
    }

    if (!exp_month.trim()) {
        errors.exp_month = 'Expiry month is required';

    }
    if (!exp_year.trim()) {
        errors.exp_year = 'Expiry year is required';
    }

    if (!cvv.trim()) {
        errors.cvv = 'CVV number is required';
    }
    else if (cvv.length != 3) {
        errors.cvv = 'CVV number must be 3 integers long';

    }



    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }




    //   const paymentGateway = new PaymentGateway();
    //   const paymentResult = await paymentGateway.processPayment(order.totalAmount, CreditCardNumber, exp_month);

    //     if (!paymentResult.success) {
    //         return res.status(400).json({ errors: { payment: paymentResult.message } });
    //     }


});

