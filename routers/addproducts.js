const express = require('express');
const { Product } = require('../models/product');
const multer = require('multer');
const router = express.Router();
const products = require('../controllers/addProductController');

router.get('/view', (req, res) => {
    res.render('pages/displayproducts');
});

const productstorage = multer.diskStorage({
    destination: 'public/Images',
    filename: (req, file, myfunc) => {
        myfunc(null, file.originalname);
    },
});

const upload = multer({
    storage: productstorage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'img') {
            cb(null, true);
        } else {
            cb(new Error('Invalid field name'), false);
        }
    },
}).fields([{ name: 'img', maxCount: 4 }]);

router.get('/', (req, res) => {
    if (req.session.admin != undefined) {
        let invalidInputs = {};
        let images = []; // intializing an empty array of images
        res.render('pages/addproducts', {
            invalidInputs,
            images,
            isadmin: req.session.admin,
        }); // passing the images array to ejs
    } else {
        res.render('pages/404');
    }
});

router.post('/', upload, products.addProduct);
module.exports = router;
