
const express = require('express');
const  Cart  = require('../models/cart');
const { Product } = require('../models/product');
const router = express.Router();

router.post(`/:id/:page`, async  (req, res) => {

    Product.findById(req.params.id)
    .then( (result) => {    
        const cart={
            id:result.id,
            name:result.name,
            image:result.image,
            price: result.price,
          }
        const carts=new Cart(cart);
        carts
            .save()
            .then( (result) => {
                res.redirect(`/products/${req.params.page}`);
            })
            .catch( err => {
              console.log(err);
            });
    })   
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
