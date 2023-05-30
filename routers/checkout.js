const express = require('express');
const Cart = require('../models/cart');
const { Product } = require('../models/product');
const { Order } = require('../models/order');
const { User } = require('../models/user');
const router = express.Router();

router.post('/checkout', async (req, res)=>{
    let totalAmount = 0;
    req.session.cart.items.forEach((items)=>{
        if(items.quantity>1){
            totalAmount+=items.price * items.quantity;

        }
        else{
            totalAmount+=items.price;
        }
    })
})

router.get(`/`, function (req, res) {

    if(req.session.cart==undefined)
    {
        res.render('pages/checkout', {
            user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
            totalamount:undefined
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
            totalamount:totalAmount
        });
    }
  
});

module.exports = router;