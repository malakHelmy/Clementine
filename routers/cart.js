const express = require('express');
const Cart = require('../models/cart');
const { Product } = require('../models/product');
const router = express.Router();

router.get('/:con/:id', (req, res) => {
    if (req.params.con == 'minus') {
        let i = 0;
        req.session.cart.items.forEach((items, index) => {
            if (items.id == req.params.id) {
                if (items.quantity > 1) items.quantity--;
                else {
                    req.session.cart.items.splice(index, 1);
                }
            }
        });

        res.redirect('/');
    } else if (req.params.con == 'plus') {
        req.session.cart.items.forEach((items) => {
            if (items.id == req.params.id) {
                items.quantity++;
            }
        });
        res.redirect('/');
    } else {
        res.render('pages/404');
    }
});

router.post(`/:id`, async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })
        .then((result) => {
            const CartItem = {
                id: result._id,
                name: result.name,
                image: result.image,
                price: result.price,
                quantity: 1,
                email:
                    req.session.user == undefined
                        ? undefined
                        : req.session.user,
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
        })
        .catch((err) => {
            console.log(err);
        });

    res.redirect('/');
});

// router.post(`/:id/:page`, async (req, res) => {
//     Product.findById(req.params.id)
//         .then(async (result) => {
//             const cart = {
//                 id: result.id,
//                 name: result.name,
//                 image: result.image,
//                 price: result.price,
//             };
//             await Cart.findOneAndUpdate(
//                 cart,
//                 {
//                     id: result.id,
//                     name: result.name,
//                     image: result.image,
//                     price: result.price,
//                     $inc: {
//                         quantity: 1,
//                     },
//                 },
//                 {
//                     upsert: true,
//                 }
//             );
//             setTimeout(() => {
//                 res.redirect(`/products/${req.params.page}`);
//             }, 700);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

module.exports = router;
