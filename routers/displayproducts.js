const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

router.get('/', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Render the products template and pass the products data
    res.render('pages/displayproducts', { products });
  } catch (error) {
    console.log(error);
    // Handle any errors that occur
    res.render('pages/error');
  }
});

module.exports = router;
