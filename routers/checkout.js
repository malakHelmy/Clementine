const express = require('express');
const Cart = require('../models/cart');
const { Product } = require('../models/product');
const { Order } = require('../models/order');
const user = require('../models/user');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// router.post('/checkout', checkoutController.checkoutCont);
const errors = {};

router.post('/', async (req, res) => {
    let totalAmountfinal = 0;
    if (req.session.cart.items != undefined) {
        req.session.cart.items.forEach((items) => {
            if (items.quantity > 1) {
                totalAmountfinal += items.price * items.quantity;
            } else {
                totalAmountfinal += items.price;
            }
        });
    }
    try {
        // adding the new order to the user's list of orders
        const User = await user.findOne({ email: req.session.user });
        let products = [];
        let cart = req.session.cart;
        cart.items.forEach((items) => {
            products.push(items.id);
        });

        console.log(products);
        const productinCart = await Product.find({
            _id: { $in: products },
        });
        console.log(productinCart);
        if (!User) {
            res.status(404).console.log('Cannot find user');
        }

        const order = new Order({
            userID: User._id,
            userFullName: User.firstname + ' ' + User.lastname,
            orderItems: productinCart,
            city: req.body.city,
            shippingAddress1: req.body.shippingAddress1,
            CreditCardNumber: req.body.CreditCardNumber,
            exp_month: req.body.exp_month,
            state: req.body.state,
            zip: req.body.zip,
            status: req.body.status,
            totalAmount: totalAmountfinal,
        });
        //$push adds the order id to the orders array in the user schema
        await user.findOneAndUpdate(
            { email: req.session.user },
            { $push: { orders: order._id } },
            { new: true }
        );
        await User.save();
        await order.save();
        productinCart.forEach(async (product) => {
            await Product.findOneAndUpdate(
                { _id: product._id },
                {
                    countInStock: product.countInStock - cart.items.quantity,
                },
                { new: true }
            );
        });
        console.log('order placed successfuly.');
        req.session.cart = undefined;
        res.render('pages/placedOrder', {
            order,
            user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: { server: 'Server error' } });
    }
});

router.get(`/`, function (req, res) {
    if (req.session.cart == undefined) {
        res.render('pages/checkout', {
            user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
            totalamount: undefined,
            errors: {},
        });
    } else {
        let totalAmount = 0;

        req.session.cart.items.forEach((items) => {
            if (items.quantity > 1) {
                totalAmount += items.price * items.quantity;
            } else {
                totalAmount += items.price;
            }
        });
        res.render('pages/checkout', {
            user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
            totalamount: totalAmount,
            errors: {},
        });
    }
});

module.exports = router;
