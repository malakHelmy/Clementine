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
        var userOrder = await Order.find({ userID: { $in: userProfile._id } });
        var wishlistItems = await Product.find({
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

    }else if(req.session.employer != undefined){

        res.redirect('/dashboard', );
        // req.session.employer=empresult.email;
        //     req.session.admin=empresult.isAdmin;
    }
else{
    res.redirect('/404')
}

});
router.get(`/order`, users.getOrders);
router.get(`/editprofile`, users.getUserEditor);

router.get(`/order/:id`, async (req, res) => {
    const userProfile = await user.findOne({ email: req.session.user });
    if (!userProfile) {
        console.log('user was not found');
        res.redirect('/404');
    }
    let userOrder = await Order.findOne({ _id: req.params.id });
    console.log(userOrder);
    let orderitem = await Product.find({_id : {$in : userOrder.orderItems}});
    console.log(orderitem);

    res.render('pages/userOrder', {
        user: req.session.user == undefined ? undefined : userProfile,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        order: userOrder,
        orderitems : orderitem,
    });
});

router.post('/editprofile', users.editUser );

module.exports = router;
