const express = require('express');
const router = express.Router();
const fs = require('fs');
const { basename } = require('path');
const {Product} = require('../models/product');
const path = require('path');
const multer = require('multer');
const products = require('../controllers/addProductController');


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

// GET route for displaying the edit product form
router.get('/:id', async (req, res) => {
    if (req.session.admin != undefined) {
        const productId = req.params.id;
        const product = await Product.findOne({ id: productId });
        if (product) {
            res.render('pages/editproducts', {
                product,
                isadmin: req.session.admin,
                basename: basename
            });
        } else {
            res.status(404).render('pages/404');
        }
    } else {
        res.render('pages/404');
    }
});

// POST route for updating the product
router.post('/:id', upload, products.editProduct);

module.exports = router;
