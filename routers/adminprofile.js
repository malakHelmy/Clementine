const express = require('express');
const user = require('../models/employer');
const admins = require('../controllers/adminprofileController');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    const admininfo = await user.findOne({ email: req.session.employer });

    res.render('pages/adminprofile', {
        isadmin: req.session.admin,
        admin: admininfo,
        currentPage: 'settings',
        employer:
            req.session.employer == undefined
                ? undefined
                : req.session.employer,
        req: req,
    });
});

router.post('/', async (req, res) => {
    const updates = req.body;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    let phonevalue = req.body.phone;
    let emailvalue = req.body.email;
    const ad = await user.findOne({ email: req.session.employer });
    let updateObject = {};
    if (phonevalue) {
        updateObject.phone = phonevalue;
    }
    if (emailvalue) {
        updateObject.email = emailvalue;
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, ad.password);
    if (!isOldPasswordValid) {
        res.redirect(
            '/adminprofile?success=false&message=Old+password+is+incorrect'
        );
    }
    if (newPassword !== confirmPassword) {
        res.redirect(
            '/adminprofile?success=false&message=New+password+and+confirm+password+do+not+match'
        );
    }

    updateObject.password = await bcrypt.hash(newPassword, 12);
    let admin = await user.findOneAndUpdate(
        { email: req.session.employer },
        updateObject,
        {
            new: true,
        }
    );
    console.log(admin);
    res.redirect(
        '/adminprofile?success=true&message=Password+updated+successfully'
    );
});
module.exports = router;
