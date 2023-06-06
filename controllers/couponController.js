const Coupon = require('../models/coupon'); 

const asyncHandler = require('express-async-handler');

exports.createCoupon = asyncHandler(async (req, res)=>{
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error)
    }
});

