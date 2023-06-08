const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product').Product;
const products = require('../controllers/addProductController');
const path = require('path');

// GET route for displaying the edit product form
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


router.get('/:id', async (req, res) => {
    try {
        if (req.session.admin != undefined) {
            let invalidInputs = {};
            let images = []; // intializing an empty array of images
            const productId = req.params.id;
            const product = await Product.findOne({ id: productId });
            if (product) {
                res.render('pages/editproducts', {
                    product,
                    isadmin: req.session.admin,
                });
            } else {
                res.status(404).render('pages/404');
            }
        } else {
            res.render('pages/404');
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route for updating the product
router.post('/:id', upload, async (req, res) => {
    try {
        
        let invalidInputs = {};
        let images = []; // intializing an empty array of images
        const productId = req.params.id;
        const updatedProductData = req.body;
        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            updatedProductData,
            { new: true }
        );
        if (updatedProduct) {
            console.log('Updated product data:', updatedProduct);
            res.redirect('/displayproducts');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Internal Server Error');
    }
});

// router.post('/', products.addProduct);





module.exports = router;
