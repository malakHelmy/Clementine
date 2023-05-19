const express = require('express');
const router = express.Router();
const Product = require('../models/product').Product;

// GET route for displaying the edit product form
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      res.render('pages/editproducts', { product });
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST route for updating the product
router.post('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );
    if (updatedProduct) {
      console.log('Updated product data:', updatedProduct);
      res.redirect('/products');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
