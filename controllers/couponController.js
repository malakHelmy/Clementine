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

exports.getAllCoupons = asyncHandler(async (req, res)=>{
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        throw new Error(error)
    }
});
exports.updateCoupon = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    try {
        const updateCoupons = await Coupon.findByIdAndUpdate(id, req.body,{new: true});
        res.json(updateCoupons);
    } catch (error) {
        throw new Error(error)
    }
});

exports.deleteCoupon = asyncHandler(async (req, res)=>{
    const { id } = req.params;
    try {
        const deleteCoupons = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupons);
    } catch (error) {
        throw new Error(error)
    }
});



