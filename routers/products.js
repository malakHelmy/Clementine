/*for every model, there are routers. 
routers are responsible for creating/ storing/ Importing and exporting APIs between the files
*/
const express = require('express');

const products = require('../controllers/productController');
const router = express.Router();

router.get('/products', products.getAllProducts);
//diamond
router.get('/drings', products.getDrings);
router.get('/dearrings', products.getDearrings);
router.get('/dnecklaces', products.getDnecklaces);
router.get('/dbracelets', products.getDbracelets);
//gold
router.get('/grings', products.getGrings);
router.get('/gearrings', products.getGearrings);
router.get('/gnecklaces', products.getGnecklaces);
router.get('/gbracelets', products.getGbracelets);

router.get('/:id', products.productDetails);

// router.post(`/`, async (req, res) => {
//     const cat = await Category.findById(req.body.category);
//     if (!cat) {
//         return res.status(400).send('This Category does not exist');
//     }

//     const product = new Product({
//         id: req.body.id,
//         name: req.body.name,
//         image: req.body.image,
//         images: req.body.images,
//         price: req.body.price,
//         description: req.body.description,
//         material: req.body.material,
//         category: req.body.category,
//         countInStock: req.body.countInStock,
//         featured: req.body.featured,
//         date: req.body.date,
//     });

//     //catching errors method #2
//     product
//         .save()
//         .then((createdProduct) => {
//             res.status(201).json(createdProduct);
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 error: err,
//                 success: false,
//             });
//         });
// });

// router.delete('/:id', function (req, res) {
//     Product.findByIdAndRemove(req.params.id)
//         .then((product) => {
//             if (product) {
//                 return res.status(200).json({
//                     success: true,
//                     message: 'the product has been deleted',
//                 });
//             } else {
//                 return res.status(404).json({
//                     success: false,
//                     message: 'the product was not found',
//                 });
//             }
//         })
//         .catch((err) => {
//             return res.status(400).json({ success: false, error: err });
//         });
// });

// router.post('/drings', async (req, res) => {
//     try {
//         let products = await Product.find({});
//         res.render('../views/pages/products', { products });
//     } catch (error) {
//         res.status(500).send({ message: error.message || 'ERROR OCCURED' });
//     }
// });

//exporting method #2
module.exports = router;