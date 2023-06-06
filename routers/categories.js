const express = require('express');
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const router = express.Router();

//display all objects in the category schema
router.get(`/`, async function (req, res) {
    const categories = await Category.find();

    //catching errors method #1
    if (!categories) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(categories);
});

//display a specific object from the schema
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(500).json({
            message:
                'The Category with the given ID was not found please check for the validity of the ID',
        });
    }

    res.status(200).send(category);
});

//add an object to the schema
router.post(`/`, async function (req, res) {
    let cat = new Category({
        id: req.body.id,
        name: req.body.name,
    });

    //catching errors method #2
    cat = await cat.save();
    if (!cat) {
        return res.status(404).send('The Category cannot be created');
    }

    res.send(cat);
});

//edit or update an object from the schema
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            id: req.body.id,
            name: req.body.name,
        },
        {
            //return updated data
            new: true,
        }
    );

    if (!category) {
        return res.status(404).send('The Category cannot be updated');
    }

    res.send(category);
});

//delete an object from the schema
router.delete('/:id', function (req, res) {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({
                    success: true,
                    message: 'the category has been deleted',
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'the category ia not found',
                });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
});

//exporting method #2
module.exports = router;
