
const express = require('express');
const session = require('express-session');
const Cartt = require('../models/cart');
const bcrypt = require('bcrypt');
const router = express.Router();


router.get('/', (req, res) => {


    req.session.cart.items.forEach(async (items) => {
      await Cartt.findOneAndUpdate({email:req.session.user},
        {
            id:items.id,
            name:items.name,
            image:items.image,
            price:items.price,
           quantity:items.quantity,
           email:  req.session.user,
        },{upsert:true})
      });  

    req.session.destroy();
    res.redirect('/');
});

module.exports = router;