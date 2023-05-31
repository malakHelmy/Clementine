const express = require('express');
const { Product } = require('../models/product');const router = express.Router();

router.get('/add', (req, res) => {
  res.render('pages/addproducts');
});

router.get('/view', (req, res) => {
  res.render('pages/displayproducts');
});


router.post('/', (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then(() => {
      return Product.find();
    })
    .then((products) => {
      res.render('pages/displayproducts', { products });
    })
    .catch((err) => {
      console.log(err);
      res.render('pages/addproducts');
    });
});

module.exports = router;
