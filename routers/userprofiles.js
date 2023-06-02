const express = require('express');
const { Order } = require('../models/order');
//const { OrderItem } = require('../models/order-items');
const { Product } = require('../models/product');
const user = require('../models/user');
const users = require('../controllers/userprofileController');
const router = express.Router();

router.get(`/`, async (req, res) => {
    if (req.session.user != undefined) {
        const userProfile = await user.findOne({ email: req.session.user });
        const userOrder = await Order.find({
            userID: { $in: userProfile._id },
        });
        const wishlistItems = await Product.find({
            _id: { $in: userProfile.wishList },
        });
        if (!userOrder) {
            console.log('no orders were found');
        }
        res.render('pages/userprofilemain', {
            user: req.session.user == undefined ? undefined : userProfile,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
            orders: userOrder,
            wishlist : wishlistItems
        });
    }
});
router.get(`/order`, users.getOrders);

module.exports = router;
