const express = require('express');
const session = require('express-session');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.cart != undefined) {
        if (req.session.cart.items == '') {
            console.log('cart is empty');
            await User.findOneAndUpdate(
                { email: req.session.user },
                {
                    cart: [],
                },
                { upsert: true }
            );
        }else if(req.session.cart == undefined){

            await User.findOneAndUpdate(
                { email: req.session.user },
                {
                    cart: [],
                },
                { upsert: true }
            );
        } 
        else {
            await User.findOneAndUpdate(
                { email: req.session.user },
                {
                    cart: req.session.cart.items,
                },
                { upsert: true }
            );
        }
    }
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
