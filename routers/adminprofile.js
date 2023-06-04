const express = require('express');
const user = require('../models/employer');
const admins = require('../controllers/adminprofileController');
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user == undefined ) {
        res.redirect('/login');
        return;
    }

    const admininfo = await user.findOne({ email: req.session.user });

    res.render('pages/adminprofile', {
        admin: admininfo,
    });
});

router.post('/', async (req, res) => {
    const updates = req.body;
    let adminprof = await user.findOne({ email: req.session.user });


    let updatedAdmin = await user.findByIdAndUpdate(
        { _id: adminprof._id },
       { email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
       },
       {new:true}
    );
    console.log(updatedAdmin);
    res.render('pages/adminprofile')
});

module.exports = router;