
const express = require('express');
const  Review  = require('../models/reviews');
const { Product } = require('../models/product');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post(`/:id`, async  (req, res) => {

        const revieww={
          email:req.body.email,
          summary:req.body.summary,
          review:req.body.review,
          productId:req.params.id.trim()
        }
         console.log(revieww)
        const reviews=new Review(revieww);
        reviews.save()
            .then(async (result) => {          
               
                res.redirect(`/product/${req.params.id.trim()}`)
            //     const prod = await Product.findById({ _id: req.params.id.trim() });
            //     let product = await Product.find({ featured: true });
            //     product = product.slice(0, 5);
            //     if (!prod) {
            //         console.log(
            //             'The Product with the given ID was not found please check for the validity of the ID'
            //         );
            //         return res.status(500);
            //     }
            //     res.render('pages/productDetails', {
            //         user: req.session.user == undefined ? undefined : req.session.user,
            //         cart: req.session.cart == undefined ? undefined : req.session.cart,
            //         products: prod,
            //         product,
            //         Id: req.params.id,
            //     });

            // res.render();
       }).catch( err => {
        console.log(err);
      });
});

module.exports = router;
