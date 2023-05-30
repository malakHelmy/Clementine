/*for every model, there are routers. 
routers are responsible for creating/ storing/ Importing and exporting APIs between the files
*/
const express = require('express');
const user = require('../models/user');
const products = require('../controllers/productsController');
const { Product } = require('../models/product');
const router = express.Router();

//new in

router.post('/products',(req,res)=>{

if(req.body.sort=='Lowestprice')
{


}else if(req.body.sort=='Highestprice')
{
    
}

});

router.get('/newin', products.getNewIn);

router.get('/product/:id', async (req, res) => {
    const prod = await Product.findById({ _id: req.params.id });
    let product = await Product.find({ featured: true });
    product = product.slice(0, 5);
    if (!prod) {
        console.log(
            'The Product with the given ID was not found please check for the validity of the ID'
        );
        return res.status(500);
    }
    res.render('pages/productDetails', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        products: prod,
        product,
        Id: req.params.id,
    });
});
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

router.get('/wishlist', async (req, res) => {
    const userID = req.session.user;
    try {
        const User = await user.findOne({ email: userID });

        if (!User) {
            res.render('pages/wishlist', {
                user:
                    req.session.user == undefined
                        ? undefined
                        : req.session.user,
                cart:
                    req.session.cart == undefined
                        ? undefined
                        : req.session.cart,
                products: '',
            });
        }

        const wishlistItems = await Product.find({
            _id: { $in: User.wishlist },
        });

        res.render('pages/wishlist', {
            user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
            products: wishlistItems,
            body: 'your wishlist',
        });
    } catch (error) {
        console.log(error);
    }
});
router.post('/add-to-wishlist', async (req, res) => {
    const userID = req.session.user;
    const prod = req.body.prodID;
    try {
        products.addToWishlist(userID, prod);
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});
router.post('/remove-from-wishlist', async (req, res) => {
    const wishuserID = req.session.user;
    const removeprod = req.body.wishprodID;
    try {
        products.removeFromWishlist(wishuserID, removeprod);
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500);
    }
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
