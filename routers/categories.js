
const express = require('express');
const category = require('../models/category');
const router = express.Router();

router.get(`/`, async function (req, res) {

    const categories = await category.find();

    //catching errors method #1
    if (!categories) {
        res.status(500).json({ success: false });
    }
    res.send(categories);
});
router.post(`/`, function (req, res) {
    const cat = new category({
        id: req.body.id,
        name: req.body.name,
    });
    //catching errors method #2
    cat
        .save()
        .then((categ) => {
            res.status(201).json(createdProduct);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

//exporting method #2
module.exports = router;