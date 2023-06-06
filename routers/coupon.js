const express = require('express');
const router = express.Router();
const coupons = require('../controllers/couponController');

router.post('/', coupons.createCoupon);
router.get('/', coupons.getAllCoupons);
router.put('/:id', coupons.updateCoupon);
router.put('/:id', coupons.deleteCoupon);


module.exports = router;