const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

// Display all products
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

// Delete a product
router.post('/delete', async (req, res) => {
  try {
    const { productId } = req.body;

    // Find the product by ID and remove it from the database
    await Product.findByIdAndRemove(productId);

    // Redirect back to the displayproducts page
    res.redirect('/displayproducts');
  } catch (error) {
    console.log(error);
    // Handle any errors that occur
    res.render('pages/error');
  }
});

module.exports = router;
