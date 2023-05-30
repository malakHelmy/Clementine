const express = require('express');
const { Order } = require('../models/order');
//const { OrderItem } = require('../models/order-items');
const { Product } = require('../models/product');
const user = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
    const User = await user.findOne({ email: req.session.user });
    if (!User) {
        console.log('User was not found');
        return res.status(500);
    }
    const loggedInUserName = User.firstname;
    const wishlistItems = await Product.find({
        _id: { $in: User.wishList },
    });
    const wishlistcount = wishlistItems.length;
    Order.find()
        .then(async (orderslist) => {
            res.render('pages/userprofile', {
                wishlistItemCount: undefined ? undefined : wishlistcount,
                user: undefined ? undefined : User,
                order: orderslist,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
module.exports = router;
