
const express = require('express');
const user = require('../models/user');
const products = require('../controllers/productsController');
const { Product } = require('../models/product');
const router = express.Router();

router.get('/:id', products.productDetails);

module.exports = router;