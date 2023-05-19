
const express = require('express');
const  Cart  = require('../models/cart');
const { Product } = require('../models/product');
const router = express.Router();

router.get('/', (req,res)=>{

    Cart.find()
    .then( (result) => { 
        res.render('pages/cart',{products:result});
    }
    )
    .catch((err) => {
      console.log(err);
    });

});

router.post(`/:id`, async  (req, res) => {
  
        await Cart.findOneAndUpdate({
            _id:req.params.id
        } ,
        {
            $inc:{
                quantity:1
            }        
        },    
        {
            upsert:true
        }   
        )
        setTimeout(() => {
           res.redirect(`/cart`);
        }, 700);
      
});

router.post(`/:id/:page`, async  (req, res) => {
   
    Product.findById(req.params.id)
    .then(async (result) => {    
        const cart={
            id:result.id,
            name:result.name,
            image:result.image,
            price: result.price,
          }
        await Cart.findOneAndUpdate(cart,
        {

            id:result.id,
            name:result.name,
            image:result.image,
            price: result.price,
            $inc:{
                quantity:1
            }        
        }
        ,
        {
            upsert:true
        }        
        )
        setTimeout(() => {
           res.redirect(`/products/${req.params.page}`);
        }, 700);
      
    })   
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
