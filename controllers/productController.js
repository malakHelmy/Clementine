const { Product } = require('../models/product');

const getAllProducts = (req, res) => {
    Product.find()
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};

const deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                console.log('Product was successfully removed');
                return res.status(200);
            } else {
                console.log('could not remove product');
                return res.status(404);
            }
        })
        .catch((err) => {
            console.log('could not remove product');
            return res.status(400);
        });
};

const productDetails = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        console.log('The Product with the given ID was not found please check for the validity of the ID');
        return res.status(500);
    }

    res.render('pages/productDetails', {
        products: product,
        Id: req.params.id,
    });
};

//diamond

const getDrings = (req, res) => {
    Product.find({ material: 'diamond', category: 'ring' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};
const getDnecklaces = (req, res) => {
    Product.find({ material: 'diamond', category: 'necklace' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};
const getDearrings = (req, res) => {
    Product.find({ material: 'diamond', category: 'earring' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};
const getDbracelets = (req, res) => {
    Product.find({ material: 'diamond', category: 'bracelet' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log('error loading');
        });
};

//Gold
const getGrings = (req, res) => {
    Product.find({ material: 'gold', category: 'ring' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
const getGnecklaces = (req, res) => {
    Product.find({ material: 'gold', category: 'necklace' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
const getGearrings = (req, res) => {
    Product.find({ material: 'gold', category: 'earring' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
const getGbracelets = (req, res) => {
    Product.find({ material: 'gold', category: 'bracelet' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    getAllProducts,
    deleteProduct,
    productDetails,
    getDrings,
    getDbracelets,
    getDearrings,
    getDnecklaces,
    getGrings,
    getGbracelets,
    getGearrings,
    getGnecklaces,
};
