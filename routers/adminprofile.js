const express = require('express');
const user = require('../models/employer');
const admins = require('../controllers/adminprofileController');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', async (req, res) => {
    if (req.session.user == undefined) {
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
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    let phonevalue = req.body.phone;
    let emailvalue = req.body.email;

    let updateObject = {};
    if (phonevalue) {
        updateObject.phone = phonevalue;
    }
    if (emailvalue) {
        updateObject.email = emailvalue;
    }

    let admin = await user.findOneAndUpdate({ email: req.session.user }, updateObject, { new: true }).exec();

    const isOldPasswordValid = await bcrypt.compare(oldPassword, admin.password);
    if (!isOldPasswordValid) {
        res.send({ success: false, message: 'Old password is incorrect' });
        return;
    }
    if (newPassword !== confirmPassword) {
        res.send({ success: false, message: 'New password and confirm password do not match' });
        return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    admin.password = hashedNewPassword;
    await admin.save();

    res.send({ success: true, message: 'Password updated successfully' });
});

module.exports = router;