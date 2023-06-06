const express = require('express');
const router = express.Router();
const coupons = require('../controllers/couponController');

router.post('/', coupons.createCoupon);


module.exports = router;