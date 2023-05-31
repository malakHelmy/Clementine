const { basename } = require('path');
const { Product } = require('../models/product');
const user = require('../models/user');
const asyncHandler = require('express-async-handler');
const path = require('path');

exports.validateProduct = asyncHandler(async (req, res) => {
    let imgFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    imgFile = req.files['img'][0];
    uploadPath = path.join(req.body.id + path.extname(imgFile.name));
const { count } = require("../models/cart");

exports.addProduct = async (req, res) => {
    const { name, price, description, material, category, countInStock } = req.body;
    let invalidInputs = {};
    let files = req.files;
    let images = [];
    let priceformat = !/^\d+(.\d{1,2})?$/;
    let countformat = !/^\d+$/;

    if (!name || name.trim() === '') {
        invalidInputs.name = 'Invalid jewelry name, please try again.';
    }

    if (!description || description.trim() === '') {
        invalidInputs.description = 'You must define the product.';
    }

    if (!material || material.trim() === '') {
        invalidInputs.material = 'Please enter the material of the jewelry.';
    }

    if (!price || price.trim() === "") {
        invalidInputs.price = "You must enter a price value.";
    } else if (!price.match(priceformat)) {
        invalidInputs.price = "Invalid price input.";
    }

    if (!category || category.trim() === '') {
        invalidInputs.category = 'Please enter the category.';
    }

    if (!countInStock || countInStock.trim() === "") {
        invalidInputs.countInStock = "Please enter the count in stock.";
    } else if (!count.match(countformat)) {
        invalidInputs.countInStock = "Count in stock must be a positive integer.";
    }

    if (!files || Object.keys(files).length === 0) {
        invalidInputs.images = "Please upload at least one image.";
    } else {
        for (let file of files) {
            let image = {
                filename: file.filename,
                path: file.path,
            };
            images.push(image);
        }
    }

    if (Object.keys(invalidInputs).length > 0) {
        return res.status(404).json({ errors: invalidInputs });
    }

    // Use the mv() method to place the file somewhere on your server
    imgFile.mv(uploadPath, function (err) {
        if (err) res.status(500).send(err);

        const product = new Product({
            id: req.body.id,
            name: req.body.name,
            image: req.body.id,
            images: req.body.id,
            price: req.body.price,
            description: req.body.description,
            material: req.body.material,
            category: req.body.category,
            countInStock: req.body.countInStock,
        });
        product
            .save()
            .then((result) => {
                res.redirect('/addproducts');
            })
            .catch((err) => {
                console.log(err);
            });
    });
}});

exports.addProduct = asyncHandler(async function (req, res, next) {
    const { id, name, price, description, material, category, countInStock } =
        req.body;
    let imgFiles = [];
    let uploadPaths = [];

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
    let image = req.files['img'][0].path;
    image = path.basename(image);

    const product = new Product({
        id,
        name,
        image,
        images: uploadPaths,
        price,
        description,
        material,
        category,
        countInStock,
        // save the uploaded image path to the database
    });
    product
        .save()
        .then((result) => {
            res.redirect('/view');
        })
        .catch((err) => {
            console.log(err);
        });
});

// async function addProduct(req, res, next) {
//     const { name, price, description, material, category, countInStock } =
//         req.body;
//     const images = req.files['photo'].map((file) => file.path); // access the array of files using the field name

//     console.log('Files:', req.files); // checking if the files are being uploaded
//     console.log('Paths:', images); // checking if the paths are being saved correctly

//     const product = new Product({
//         name,
//         price,
//         description,
//         material,
//         category,
//         countInStock,
//         images,
//     });

//     try {
//         await product.save();
//         res.redirect('/view');
//     } catch (error) {
//         console.error(error);
//         const invalidInputs = {
//             name,
//             price,
//             description,
//             material,
//             category,
//             countInStock,
//         };
//         const files = req.files || [];
//         res.render('pages/addproducts', {
//             error: 'Failed to add product',
//             invalidInputs,
//             files,
//         });
//     }
// }
