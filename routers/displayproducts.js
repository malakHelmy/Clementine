const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

// Display all products
router.get('/', async (req, res) => {
  try {
   
    if(req.session.admin != undefined){
      const products = await Product.find();
    res.render('pages/displayproducts', { products,isadmin:req.session.admin });
    }else{
      res.render('pages/404');
    }
  

  } catch (error) {
    console.log(error);
    // Handle any errors that occur
    res.render('pages/404');
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
