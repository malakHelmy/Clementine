
const express = require('express');
const { Product }  = require('../models/product');
const router = express.Router();


router.get('/',(req,res)=>{
res.render('pages/addproducts')
})

router.post(`/`,   (req, res) => {

     
        const products =new Product(req.body);
        products
        .save()
        .then( (result) => {
            res.render('pages/dashboard');
        })
        .catch( err => {
          console.log(err);
        });
});

module.exports = router;
