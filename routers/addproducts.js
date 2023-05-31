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

const upload = multer({
  storage: productstorage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'photo') {
      cb(null, true);
    } else {
      cb(new Error('Invalid field name'), false);
    }
  },
}).fields([{ name: 'photo', maxCount: 6 }]);

router.get('/view', (req, res) => {
  res.render('pages/displayproducts');
});

router.get('/', (req, res) => {
  const invalidInputs = {};
  const images = []; // intializing an empty array of images
  res.render('pages/addproducts', {
    invalidInputs, images
  }); // passing the images array to ejs
});

router.post('/', upload, addProduct);

module.exports = router;