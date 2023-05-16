/*for every model, there are routers. 
routers are responsible for creating/ storing/ Importing and exporting APIs between the files
*/
const express = require('express');
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const router = express.Router();

router.get(`/`, async function (req, res) {
    /*sending an object from backend to API/Postman
    const product = {
        id: '1',
        name: 'example',
    };
    res.send(product);*/

    /*read objects from database and display them in the front-end,
    async + await are required since the database wasn't ready when it was called for
    , these keywords urge the system to wait til the database is ready*/
    const prodList = await Product.find();

    //catching errors method #1
    if (!prodList) {
        res.status(500).json({ success: false });
    }
    res.send(prodList);
});
router.post(`/`, async (req, res) => {
    const cat = await Category.findById(req.body.category);
    if (!cat) {
        return res.status(400).send('This Category does not exist');
    }

    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        images: req.body.images,
        price: req.body.price,
        description: req.body.description,
        material: req.body.material,
        category: req.body.category,
        countInStock: req.body.countInStock,
        featured: req.body.featured,
        date: req.body.date,
    });

    //catching errors method #2
    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

router.delete('/:id', function (req, res) {
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
});

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            message:
                'The Product with the given ID was not found please check for the validity of the ID',
        });
    }

    res.status(200).send(product);
});
router.post('/drings', async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('pages/products', { products });
        res.render('pages/products');
    } catch (error) {
        res.status(500).send({ message: error.message || 'ERROR OCCURED' });
    }
});

//exporting method #2
module.exports = router;
// exports.homepage = async (req, res) => {
//     try {
//         const products = await Product.find({});
//         res.render('products', { products });
//     } catch (error) {
//         res.status(500).send({ message: error.message || 'ERROR OCCURED' });
//     }
// };

// async function insertProduct() {
//     try {
//         await Product.insertMany({

//                 "id":"dring",
//             "name":"Daisy Flower Crown Ring",
//             "image":"ringg2.png",
//             "images":["ringg2.png"],
//             "price":"21000",
//             "description":"The most feminine spring ring",
//             "material":"diamond",
//             "category":"ring",
//             "countInStock":"6",
//             "featured":false,

//         });
//     } catch (error) {
//         console.log('err' + error);
//     }
// }
// insertProduct();
