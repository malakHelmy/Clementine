const express = require('express');
const session = require('express-session');
const Cart = require('../models/cart');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get(`/`, function (req, res) {
    res.render('pages/login', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});

router.post(`/`, async (req, res) => {

    const Error={emailerror:String,Passerror:String};

    const result = await User.findOne({ email: req.body.inputs.email });
    if (result) {
        if (await bcrypt.compare(req.body.inputs.password, result.password)) {
            req.session.user = req.body.email;
            if (req.session.cart != undefined)
                req.session.cart.items.forEach((items) => {
                    items.email = req.session.user;
                });

            const result = await Cart.find({ email: req.body.email });
            console.log(result);
            if (result != undefined && req.session.cart != undefined) {
                result.forEach((items) => {
                    let c = 0;
                    req.session.cart.items.forEach((items2) => {
                        if (items.id == items2.id) {
                            items2.quantity += items.quantity;
                            c++;
                        }
                    });
                    if (c == 0) {
                        req.session.cart.items.push(items);
                    }
                });
            } else if (result != undefined && req.session.cart == undefined) {
                let c = 0;
                result.forEach((items) => {
                    if (c == 0) {
                        c++;
                        req.session.cart = {
                            items: [items],
                        };
                    } else {
                        req.session.cart.items.push(items);
                    }
                });
            }
            res.send('true');
        } else {
            Error.Passerror="Please enter right password";
            res.send(Error);
        }
    } else {
        
         Error.emailerror="Please enter right email";
         Error.Passerror="Please enter right email first";
         res.send(Error);
    }
});

module.exports = router;
