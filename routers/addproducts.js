const express = require('express');
const { Product } = require('../models/product');const router = express.Router();

router.get('/add', (req, res) => {
  res.render('pages/addproducts');
});

router.post('/', (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then(() => {
      res.render('pages/dashboard');
    })
    .catch((err) => {
      console.log(err);
      res.render('pages/error');
    });
});

module.exports = router;
