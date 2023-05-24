
const { Product } = require('../models/product');

const getAllProducts = (req,res)=>{
    Product.find()
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

const deleteProduct = (req,res)=>{
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: 'the product has been deleted',
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'the product was not found',
                });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
}

const productDetails = async (req,res)=>{
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            message:
                'The Product with the given ID was not found please check for the validity of the ID',
        });
    }

    res.render('pages/productDetails', {
        products: product,
        Id: req.params.id,
    });
}

//diamond

const getDrings = (req,res)=>{
    Product.find({ material: 'diamond', category: 'ring' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
const getDnecklaces = (req,res)=>{
    Product.find({ material: 'diamond', category: 'necklace' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
const getDearrings = (req,res)=>{
    Product.find({ material: 'diamond', category: 'earring' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
const getDbracelets = (req,res)=>{
    Product.find({ material: 'diamond', category: 'bracelet' })
        .then((result) => {
            res.render('pages/products', {
                products: result,
                Id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

//Gold
const getGrings = (req,res)=>{}
const getGnecklaces = (req,res)=>{}
const getGearrings = (req,res)=>{}
const getGbracelets = (req,res)=>{}

module.exports = 
{
    getAllProducts,
    getDrings,
    getDbracelets,
    getDearrings,
    getDnecklaces,
    getGrings,
    getGbracelets,
    getGearrings,
    getGnecklaces,
    deleteProduct,
    productDetails
};