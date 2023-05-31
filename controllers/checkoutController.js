const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const Order = require('../models/order');
const PaymentGateway = require('../models/paymentgateway');
const cart = require('../models/cart');


exports.checkoutCont = asyncHandler(async (req, res, next) => {
    const { userFullName, city, shippingAddress1, CreditCardNumber } = req.body;
    const cardformat = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

    const errors = {};

    if (!userFullName.trim()) {
        errors.userFullName = 'Full name is required';
    }

    if (!city.trim()) {
        errors.city = 'City is required';
    }

    if (!shippingAddress1.trim()) {
        errors.shippingAddress1 = 'Address is required';
    }

    if (!CreditCardNumber.trim()) {
        errors.CreditCardNumber = 'Credit card number is required';
    } else if (!CreditCardNumber.match(cardformat)) {
        errors.CreditCardNumber = 'Invalid credit card number';
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

