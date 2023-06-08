const express = require('express');
const Cart = require('../models/cart');
const { Product } = require('../models/product');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/cart', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        employer:req.session.employer== undefined? undefined: req.session.employer
    });
});

router.post('/remove', (req, res) => {
    let i = 0;
    req.session.cart.items.forEach((items, index) => {
        if (items.id == req.body.id) {
            req.session.cart.items.splice(index, 1);
        }
    });

   
    res.send({ payload: req.session.cart });
});

router.post('/minus', (req, res) => {
    let i = 0;
    req.session.cart.items.forEach((items, index) => {
        if (items.id == req.body.payload) {
            if (items.quantity > 1) items.quantity--;
            else {
                req.session.cart.items.splice(index, 1);
            }
        }
    });
    res.send({ payload: req.session.cart });
});
router.post('/plus', async (req, res) => {
    const product = await Product.findOne({ _id: req.body.payload });
    req.session.cart.items.forEach((items) => {
        if (items.id == req.body.payload) {
            if (items.quantity < product.countInStock) {
                items.quantity++;
            }
        }
    });
    res.send({ payload: req.session.cart });
});

router.post(`/add-to-cart`, async (req, res) => {
    let userID = req.session.user;
    const product = await Product.findOne({ _id: req.body.payload })
        .then((result) => {
            const CartItem = {
                id: result._id,
                name: result.name,
                image: result.image,
                price: result.price,
                quantity: 1,
                email: userID,
            };
            const { cart } = req.session;
            if (cart) {
                let c = 0;
                req.session.cart.items.forEach((items) => {
                    if (items.id == CartItem.id) {
                        c++;
                        items.quantity++;
                    }
                });
                if (c == 0) req.session.cart.items.push(CartItem);
            } else {
                req.session.cart = {
                    items: [CartItem],
                };
            }
            res.send({
                payload: req.session.cart,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;