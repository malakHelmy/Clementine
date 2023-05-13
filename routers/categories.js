
const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();

router.get(`/`, async function (req, res) {

    const categories = await Category.find();

    //catching errors method #1
    if (!categories) {
        res.status(500).json({ success: false });
    }
    res.send(categories);
})

router.post(`/`, async function (req, res) {
    let cat = new Category({
        id: req.body.id,
        name: req.body.name,
    })

    //catching errors method #2
    cat = await cat.save();
    if(!cat)
    {
        return res.status(404).send('The Category cannot be created');
    }

    res.send(cat);
})

router.delete('/:id', function (req,res) {
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success: true, message: 'the category has been deleted'});
        }
        else 
        {
            return res.status(404).json({success: false, message: 'the category ia not found'});
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err});
    });
})

//exporting method #2
module.exports = router;