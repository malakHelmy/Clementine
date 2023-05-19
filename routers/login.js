const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post(`/login`, async (req, res) => {
    let result = { email: req.body.email, password: req.body.password };
    User.find(result).then((results) => {
        if (results.length > 0) {
            console.log(results[0]);
            console.log(results[0].firstname + ' has logged in');

            req.session.user = results[0];
            res.render('pages/index', {
                user: req.session.user === undefined ? '' : req.session.user,
            });
        } else {
            res.render('pages/login', {
                user: req.session.user === undefined ? '' : req.session.user,
            });
        }
    });
});

// router.post(`/`, async (req, res) => {
//     let x = false;
//     User.find()
//         .then(async (result) => {
//             result.forEach(async (items) => {
//                 if (
//                     req.body.email === items.email &&
//                     (await bcrypt.compare(req.body.password, items.password))
//                 ) {
//                     x = true;
//                 }
//             });
//             setTimeout(() => {
//                 if (x == true) {
//                     res.render('pages/index');
//                 } else {
//                     res.render('pages/login');
//                 }
//             }, 700);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

module.exports = router;
