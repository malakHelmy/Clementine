const { Product } = require('../models/product');
const user = require('../models/user');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const { basename } = require('path');


exports.validateProduct = asyncHandler(async (req, res) => {
    let imgFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    imgFile = req.files['img'][0];
    uploadPath = path.join(req.body.id + path.extname(imgFile.name));
    const { count } = require('../models/cart');
    const { name, price, description, material, category, countInStock } =
        req.body;
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

    if (!price || price.trim() === '') {
        invalidInputs.price = 'You must enter a price value.';
    } else if (!price.match(priceformat)) {
        invalidInputs.price = 'Invalid price input.';
    }

    if (!category || category.trim() === '') {
        invalidInputs.category = 'Please enter the category.';
    }

    if (!countInStock || countInStock.trim() === '') {
        invalidInputs.countInStock = 'Please enter the count in stock.';
    } else if (!count.match(countformat)) {
        invalidInputs.countInStock =
            'Count in stock must be a positive integer.';
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        invalidInputs.files = 'Please upload files';
    }
    if (!req.files.img || req.files.img.length === 0) {
        invalidInputs.files = 'Please upload files';
    }
});

exports.addProduct = asyncHandler(async function (req, res, next) {
    const { id, name, price, description, material, category, countInStock } =
        req.body;
    let imgFiles = [];
    let uploadPaths = [];
    let c = 0;
    let invalidInputs = {
        name: String,
        price: String,
        description: String,
        material: String,
        countInStock: String,
    };
    let priceformat = /^[1-9]\d*$/;
    let countformat = /^[1-9]\d*$/;

    if (!name || name.trim() === '') {
        invalidInputs.name = 'Invalid jewelry name, please try again.';
        c++;
    }

    if (!description || description.trim() === '') {
        invalidInputs.description = 'You must define the product.';
        c++;
    }

    if (!material || material.trim() === '') {
        invalidInputs.material = 'Please enter the material of the jewelry.';
        c++;
    }

    if (!price || price.trim() === '') {
        invalidInputs.price = 'You must enter a price value.';
        c++;
    } else if (!price.match(priceformat)) {
        invalidInputs.price = 'Invalid price input.';
        c++;
    }

    if (!category || category.trim() === '') {
        invalidInputs.category = 'Please enter the category.';
        c++;
    }

    if (!countInStock || countInStock.trim() === '') {
        invalidInputs.countInStock = 'Please enter the count in stock.';
        c++;
    } else if (!countInStock.match(countformat)) {
        invalidInputs.countInStock =
            'Count in stock must be a positive integer.';
        c++;
    }

    if (
        !req.files ||
        !Array.isArray(req.files.img) ||
        req.files.img.length === 0 ||
        req.files.img.length > 4
    ) {
        invalidInputs.files = 'Please upload at least 4 images of the product.';
        c++;
    }

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
    if (c == 0) {
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
                res.redirect('/displayproducts');
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log(invalidInputs);
        res.redirect('back');
    }
});
exports.editProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
  
    const product = await Product.findOne({ id: productId });
  
    if (!product) {
      res.status(404).render('pages/404');
      return;
    }
  
    let { id, name, price, description, category, countInStock } = req.body;
  
    let priceformat = /^[1-9]\d*$/;
    let countformat = /^[1-9]\d*$/;
  
    let images = product.images;
    let removedImages = req.body.removedImages;
  
    if (!name || name.trim() === '') {
      name = product.name;
    }
  
    if (!price || price.trim() === '') {
      price = product.price;
    } else if (!price.match(priceformat)) {
      price = product.price;
    }
  
    if (!description || description.trim() === '') {
      description = product.description;
    }
  
    if (!category || category.trim() === '') {
      category = product.category;
    }
  
    if (!countInStock || countInStock.trim() === '') {
      countInStock = product.countInStock;
    } else if (!countInStock.match(countformat)) {
      console.log('Count in stock must be a positive integer.');
      countInStock = product.countInStock;
    }
  
    // Check if any new image files were uploaded
    if (req.files && req.files.img && req.files.img.length > 0) {
      const imgFiles = Array.isArray(req.files.img) ? req.files.img : [req.files.img];
      const uploadPaths = [];
  
      for (let i = 0; i < imgFiles.length && i < 4; i++) {
        const imgFile = imgFiles[i];
        const imageFile = imgFile.path;
        const basename = path.basename(imageFile);
        uploadPaths.push(basename);
      }
  
      images = uploadPaths;
    }
  
    // Remove images that were selected to be removed
    if (Array.isArray(removedImages)) {
      images = images.filter((image, index) => !removedImages.includes(index.toString()));
  
      for (const removedImage of removedImages) {
        const imagePath = product.images[removedImage];
        const imagePathWithoutPrefix = path.join('public', imagePath).replace(/^public\//, '');
        try {
          fs.unlinkSync(imagePathWithoutPrefix);
          console.log(`Deleted image: ${imagePathWithoutPrefix}`);
        } catch (error) {
          console.error(`Error deleting image ${imagePathWithoutPrefix}:`, error);
        }
      }
    }
  
    product.id = id;
    product.name = name;
    product.images = images; // set images property to the updated array
    product.price = price;
    product.description = description;
    product.category = category;
    product.countInStock = countInStock
  
    try {
      await product.save();
      console.log('Updated product data:', product);
      res.redirect('/displayproducts');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).render('pages/500');
    }
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
