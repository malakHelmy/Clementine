const { Product } = require('../models/product');
const user = require('../models/user');

const asyncHandler = require('express-async-handler');

exports.getAllProducts = (req, res) => {
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

exports.deleteProduct = (req, res) => {
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

// exports.productDetails = asyncHandler(async (req, res) => {
//     const prod = await Product.findById(req.params.id);

//     if (!prod) {
//         console.log(
//             'The Product with the given ID was not found please check for the validity of the ID'
//         );
//         return res.status(500);
//     }
//     res.render('pages/productDetails', {
//         products: prod,
//     });
// });

//diamond

exports.getDrings = (req, res) => {
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
exports.getDnecklaces = (req, res) => {
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
exports.getDearrings = (req, res) => {
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
exports.getDbracelets = (req, res) => {
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
exports.getGrings = (req, res) => {
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
exports.getGnecklaces = (req, res) => {
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
exports.getGearrings = (req, res) => {
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
exports.getGbracelets = (req, res) => {
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

exports.addToWishlist = asyncHandler(async (req, res) => {
    const { userID } = req.session.user._id;
    const { prodID } = req.body;
    try {
        const users = await user.findById(userID);
        const alreadyadded = users.wishlist.find(
            (id) => id.toString() === prodID
        );
        if (alreadyadded) {
            let users = await user.findByIdAndUpdate(
                userID,
                {
                    $pull: { wishlist: prodID },
                },
                {
                    new: true,
                }
            );

        } else {
            let users = await user.findByIdAndUpdate(
                userID,
                {
                    $push: { wishlist: prodID },
                },
                {
                    new: true,
                }
            );
            res.json(users);
        }
    } catch (err) {
        throw new Error(error);
    }
});

exports.getWishlist = asyncHandler(async (req, res) => {
    const { userID } = req.user;
  
    try {
      const User = await user.findById(userID);
  
      if (!User) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const wishlistItems = await product.find({ _id: { $in: User.wishlist } });
  
      res.render('pages/wishlist', { products: wishlistItems });
    } catch (error) {
      throw new Error(error);
    }
  });
