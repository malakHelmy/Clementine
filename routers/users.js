
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

router.post(`/`, async (req, res) => {
    let user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
    });

    //catching errors method #2
    user = await user.save();
    if (!user) {
        return res.status(404).send('User cannot be created');
    }

    res.send(user);
});

module.exports = router;
