/*for every model, there are routers. 
routers are responsible for creating/ storing/ Importing and exporting APIs between the files
*/
const express = require('express');
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const router = express.Router();

router.get('/',  (req, res) => {
    
    Product.find()
    .then( (result) => { 
                 
        res.render('pages/products', {products:result , Id: req.params.id } )
    }
    )
    .catch((err) => {
      console.log(err); 
    });

});
router.get('/drings',  (req, res) => {
    
    Product.find({material:"diamond", category:"ring" })
    .then( (result) => { 
                 
        res.render('pages/products', {products:result , Id: req.params.id } )
    }
    )
    .catch((err) => {
      console.log(err); 
    });

});
router.get('/dearrings',  (req, res) => {
    
    Product.find({material:"diamond", category:"earring" })
    .then( (result) => { 
                 
        res.render('pages/products', {products:result , Id: req.params.id } )
    }
    )
    .catch((err) => {
      console.log(err); 
    });

});
router.get('/dnecklaces',  (req, res) => {
    
    Product.find({material:"diamond", category:"necklace" })
    .then( (result) => { 
                 
        res.render('pages/products', {products:result , Id: req.params.id } )
    }
    )
    .catch((err) => {
      console.log(err); 
    });

});
router.get('/dbracelets',  (req, res) => {
    
    Product.find({material:"diamond", category:"bracelet" })
    .then( (result) => { 
                 
        res.render('pages/products', {products:result , Id: req.params.id } )
    }
    )
    .catch((err) => {
      console.log(err); 
    });

});

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

// router.get('/:id', async (req, res) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         return res.status(500).json({
//             message:
//                 'The Product with the given ID was not found please check for the validity of the ID',
//         });
//     }

//     res.status(200).send(product);
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

