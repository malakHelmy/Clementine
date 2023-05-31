const { count } = require("../models/cart");

exports.addProduct = async (req, res) => {
    const { name, price, description, material, category, countInStock } = req.body;
    let invalidInputs = {};
    let files = req.files;
    let images = [];
    let priceformat = !/^\d+(.\d{1,2})?$/;
    let countformat = !/^\d+$/;

    if (!name || name.trim() === "") {
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
    } else if (!price.match(priceformat)) {
        invalidInputs.price = "Invalid price input.";
    }

    if (!category || category.trim() === "") {
        invalidInputs.category = "Please enter the category.";
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
        return res.status(400).json({ errors: invalidInputs });
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
        });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

async function addProduct(req, res, next) {
    const { name, price, description, material, category, countInStock } = req.body;
    const images = req.files['photo'].map(file => file.path); // access the array of files using the field name

    console.log('Files:', req.files); // checking if the files are being uploaded
    console.log('Paths:', images); // checking if the paths are being saved correctly

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
        await product.save();
        res.redirect('/view');
    } catch (error) {
        console.error(error);
        const invalidInputs = { name, price, description, material, category, countInStock };
        const files = req.files || [];
        res.render('pages/addproducts', { error: 'Failed to add product', invalidInputs, files });
    }
}

module.exports = { addProduct };

