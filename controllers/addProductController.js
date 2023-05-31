const { Product } = require('../models/product');

exports.addProduct = async (req, res) => {

    const product = new Product({

        jname: req.body.name,
        price: req.body.price,
        description: req.body.description,
        material: req.body.material,
        category: req.body.category,
        countInStock: req.body.countInStock,
        images

    })

   
    let invalidInputs = {};

    if (!jname || jname.trim() === "") {
        invalidInputs.name = "Invalid jewelry name, please try again.";
    }

    if (!description || description.trim() === "") {
        invalidInputs.description = "You must define the product.";
    }
    if (!material || material.trim() === "") {
        invalidInputs.material = "Please enter the material of the jewelry.";
    }
    if (!price || price.trim() === "") {
        invalidInputs.price = "You must enter a price value.";
    }
    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
        invalidInputs.price = "Invalid price input.";
    }
    if (!category || category.trim() === "") {
        invalidInputs.category = "Enter the category, please.";
    }
    if (!countInStock || countInStock.trim() === "") {
        invalidInputs.countInStock = "Please provide the count.";
    }
    else if (!/^\d+$/.test(countInStock)) {
        invalidInputs.countInStock = "You must only enter a number.";
    }
    let images = [];
    if (req.files) {
        const maximgno = 6;

        if (req.files.length > maximgno) {
            invalidInputs.image = 'Please do not exceed the limit of 6 pictures.';
        } else {
            images = req.files.map((imgfile) => imgfile.path);
        }
    }


    if (Object.keys(invalidInputs).length > 0) {
        res.render('/addproducts', {invalidInputs});
        return res.status(400).json({ success: false, errors: invalidInputs });
    }

    try {
        const product = new Product({
            name,
            price,
            description,
            material,
            category,
            countInStock,
            images,
          });        res.render('addproducts', { success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, error: "Process failed." });
    }
}

