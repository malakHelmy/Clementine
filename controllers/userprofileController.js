const { Product } = require('../models/product');
const user = require('../models/user');
const { Order } = require('../models/order');
const asyncHandler = require('express-async-handler');

exports.getOrders = asyncHandler(async (req, res) => {
    const userProfile = await user.findOne({ email: req.session.user });
    if(!userProfile)
    {
        console.log('user was not found');
        res.render('pages/404');
    }
    const userOrder = await Order.find({ _id: { $in: userProfile.orders} });
    
    if(!userOrder)
    {
        console.log('no orders were found');
        res.render('pages/userprofileorder', {order: userOrder});
    }
    res.render('pages/userprofileorder', {order: userOrder});
});
