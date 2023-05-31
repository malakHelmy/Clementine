const express = require('express');
const { Product } = require('../models/product');
const multer = require('multer');
const router = express.Router();
const { addProduct } = require('../controllers/addProductController');

const productstorage = multer.diskStorage({
  destination: 'public/Images',
  filename: (req, file, myfunc) => {
    myfunc(null, file.originalname); 
  },
});
const upload = multer({ storage: productstorage }).array('photo', 6);

router.get('/add', (req, res) => {
  const invalidInputs = {};
  res.render('pages/addproducts', { invalidInputs });
});

router.get('/view', (req, res) => {
  res.render('pages/displayproducts');
});

router.get('/addproducts', (req, res) => {
  const invalidInputs = {};
  const files = req.files || [];
  res.render('pages/addproducts', { invalidInputs, files });
});

router.post('/addproducts', upload, async (req, res) => {
  const { name, price, description, material, category, countInStock } = req.body;
  const images = req.files.map(file => file.path);

  const product = new Product({
    name,
    price,
    description,
    material,
    category,
    countInStock,
    images,
  });

  try {
    awaitproduct.save();
    res.redirect('/view');
  } catch (error) {
    console.error(error);
    res.render('pages/addproducts', { error: 'Failed to add product' });
  }
});

router.post('/uploadfiles', (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send('Failed to upload images');
    } else {
      res.render('pages/images', { files: req.files });
    }
  });
});

module.exports = router;