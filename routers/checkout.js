const express = require('express');
const Cart = require('../models/cart');
const { Product } = require('../models/product');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');


// router.post('/checkout', checkoutController.checkoutCont);
const errors = {};




router.post('/checkout', async (req, res)=>{
    const { userFullName, city, shippingAddress1, CreditCardNumber, exp_month } = req.body;
    const cardformat = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;


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

    let totalAmount = 0;
    req.session.cart.items.forEach((items)=>{
        if(items.quantity>1){
            totalAmount+=items.price * items.quantity;

        }
        else{
            totalAmount+=items.price;
        }
    })
    try {

        // creating a new order
        const order = new Order({
            fullName: userFullName,
            city,
            shippingAddress1,
            CreditCardNumber,
            exp_month,
        });

        // adding the new order to the user's list of orders
        const user = await User.findOne({ _id: req.session._id });
        user.orders=user.cart;
        user.orders.push(order);
        user.cart=[]; //emptying the session cart
        await user.save();
        await order.save();

        console.log("order placed successfuly.");

        res.redirect('index');
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: { server: 'Server error' } });
    }
});


router.get(`/`, function (req, res) {

    if(req.session.cart==undefined)
    {
        res.render('pages/checkout', {
            user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
            totalamount:undefined,
            errors: {} 

        });
    }else{
        let totalAmount = 0;

        req.session.cart.items.forEach((items)=>{
            if(items.quantity>1){
                totalAmount+=items.price * items.quantity;
    
            }
            else{
                totalAmount+=items.price;
            }
        })
        res.render('pages/checkout', {
            user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
            totalamount:totalAmount,
            errors: {} 
        });
    }
  
});

module.exports = router;