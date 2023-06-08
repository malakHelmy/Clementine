const express = require('express');
const router = express.Router();
const { basename } = require('path');
const Product = require('../models/product').Product;
const path = require('path');
const multer = require('multer');

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
            });
        } else {
            res.status(404).render('pages/404');
        }
    } else {
        res.render('pages/404');
    }
});

// POST route for updating the product
router.post('/:id', upload, async (req, res) => {
    const productId = req.params.id;
    let updatedProductData = {
        name: String,
        price: String,
        description: String,
        material: String,
        countInStock: String,
        image: String,
        images: Array,
    }
    updatedProductData = req.body;
    const product = await Product.findOne({ id: productId });

    let priceformat = /^[1-9]\d*$/;
    let countformat = /^[1-9]\d*$/;

    let imgFiles = [];
    let uploadPaths = [];

    if (!updatedProductData.name || updatedProductData.name.trim() === '') {
        updatedProductData.name = product.name;
    }
    if (
        !updatedProductData.description ||
        updatedProductData.description.trim() === ''
    ) {
        updatedProductData.description = product.description;
    }
    if (
        !updatedProductData.material ||
        updatedProductData.material.trim() === ''
    ) {
        updatedProductData.material = product.material;
    }
    if (!updatedProductData.price || updatedProductData.price.trim() === '') {
        updatedProductData.price = product.price;
    } else if (!updatedProductData.price.match(priceformat)) {
        updatedProductData.price = product.price;
    }
    if (
        !updatedProductData.category ||
        updatedProductData.category.trim() === ''
    ) {
        updatedProductData.category = product.category;
    }
    if (
        !updatedProductData.countInStock ||
        updatedProductData.countInStock.trim() === ''
    ) {
        updatedProductData.countInStock = product.countInStock;
    } else if (!updatedProductData.countInStock.match(countformat)) {
        console.log('Count in stock must be a positive integer.');
        updatedProductData.countInStock = product.countInStock;
    }

    if (!req.files ||
        req.files.img.length === 0 ||
        req.files.img.length > 4) {
        updatedProductData.image = product.image;
        updatedProductData.images = product.images;
    } else {
        if (Array.isArray(req.files.img)) {
            imgFiles = [...req.files.img];
        } else {
            imgFiles.push(req.files.img);
        }
        let imageFile;
        let i = 0;
        imgFiles.forEach((imgFile) => {
            imageFile = imgFile.path;
            if (i < 4) {
                imageFile = path.basename(imageFile);
                uploadPaths.push(imageFile);
                i++;
            }
        });
        let image = uploadPaths[0];

        updatedProductData.image = image;
        updatedProductData.images = uploadPaths;
    }
    let updatedProduct = await Product.findOneAndUpdate(
        { id: productId },
        updatedProductData ,
        { new: true }
    );
    if (updatedProduct) {
        console.log('Updated product data:', updatedProduct);
        res.redirect('/displayproducts');
    } else {
        res.status(404).render('pages/404');
    }
});

module.exports = router;
