const express = require('express');
const User  = require('../models/user');

const router = express.Router();


router.post(`/`,  (req, res) => {


    const product = new User(req.body);

    //catching errors method #2
    User
        .save()
        .then((createdProduct) => {
         
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            });
        });
});

module.exports = router;