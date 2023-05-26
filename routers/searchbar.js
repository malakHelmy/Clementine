const express = require('express');
const Product = require('../models/product');
const router = express.Router();


router.post('/search', async (req, res) => {
    let payload=req.body.payload.trim();
    let search = await Product.find({
        name: {$regex: new RegExp('^'+payload+'.*','i')}
    }).exec();
    //limit search results to 10 
    search=search.slice(0,10);
    res.send({payload: search});
});
module.exports = router;