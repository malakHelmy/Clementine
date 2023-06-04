const express = require('express');
const user = require('../models/employer');
const admins = require('../controllers/adminprofileController');
const router = express.Router();

router.get(`/`, async (req, res) => {
    if (req.session.user != undefined) {
        const adminprof = await user.findOne({ email: req.session.user });

        res.render('pages/adminprofile', {
            admin: req.session.user == undefined ? undefined : adminprof,
        });
    }
});

router.post(`/adminprofile`, admins.editAdmin);

module.exports = router;