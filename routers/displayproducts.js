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
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findOneAndDelete({ _id: productId });
    console.log(productId);
    if (req.query.ajax)
      return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log('Error deleting product:', error);
    res.status(500)
      .json({ error: 'Failed to delete product, please try again.' });
  }
});

module.exports = router;
