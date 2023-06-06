const express = require('express');
const session = require('express-session');

const User = require('../models/user');
const Employer = require('../models/employer');
const bcrypt = require('bcrypt');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.post(`/newpassword`, async (req, res) => {
    const Error = { passerror: String, confirmerror: String };

    console.log(req.body.inputs.confirmpassword);

    if (req.body.inputs.password == '') {
        Error.passerror = 'Please enter password';
        Error.confirmerror = 'Please enter password first';
    } else {
        var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        var isValid = passwordPattern.test(req.body.inputs.password);
        if (isValid) {
        } else {
            Error.passerror =
                'password must contain at least 8 characters,one lowercase letter,one uppercase letter and one digit';
            Error.confirmerror = 'Please enter a right password first';
        }
    }

    if (req.body.inputs.confirmpassword == '') {
        Error.confirmerror = 'Please enter password ';
    } else if (req.body.inputs.confirmpassword == req.body.inputs.password) {
    } else {
        Error.confirmerror = 'Please enter a matching password ';
    }

    if (
        req.body.inputs.confirmpassword == req.body.inputs.password &&
        req.body.inputs.password != ''
    ) {
        const doc = await User.findOneAndUpdate(
            { email: req.session.reset },
            {
                password: await bcrypt.hash(req.body.inputs.password, 12),
                Token: undefined,
                Tokenexpiry: undefined,
            },
            {
                new: true,
            }
        );

        req.session.reset = undefined;
        res.send('done');
    } else {
        res.send(Error);
    }
});

router.get(`/resetpassword/:token`, async (req, res) => {
    const result = await User.findOne({ email: req.session.reset });

    var currentDate = new Date();

    if (result) {
        if (currentDate < result.Tokenexpiry) {
            res.render('pages/resetpass', {
                user:
                    req.session.user == undefined
                        ? undefined
                        : req.session.user,
                cart:
                    req.session.cart == undefined
                        ? undefined
                        : req.session.cart,
                        employer:req.session.employer== undefined? undefined: req.session.employer
            });
        } else {
            res.send('Token has expired');
        }
    } else {
        res.send('Error occured');
    }
});

router.post(`/resetpassword`, async (req, res) => {
    if (req.body.email == '') {
        res.send('error');
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValid = emailPattern.test(req.body.email);
        if (isValid) {
            const result = await User.findOne({ email: req.body.email });
            if (result) {
                req.session.reset = req.body.email;
                const token = crypto.randomBytes(20).toString('hex');
                var currentDate = new Date();
                const doc = await User.findOneAndUpdate(
                    { email: req.body.email },
                    {
                        Token: token,
                        Tokenexpiry: currentDate.getTime() + 10 * 60 * 1000,
                    },
                    {
                        new: true,
                    }
                );
                console.log(doc);
                console.log(token);
                const resetLink = `http://localhost:8080/login/resetpassword/${token}`;
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'clementineco2023@gmail.com',
                        pass: 'lmkwmjbyftpuzwhz',
                    },
                });
                const mailOptions = {
                    from: 'clementineco2023@gmail.com',
                    to: req.body.email,
                    subject: 'Password Reset',
                    html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        res.status(500).json({
                            message: 'Failed to send email',
                        });
                    } else {
                        res.json({ message: 'Email sent successfully' });
                    }
                });

                res.send('done');
            } else {
                res.send('wrong');
            }
        } else {
            res.send('error');
        }
    }
});

router.get(`/`, function (req, res) {
    res.render('pages/login', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        employer:
            req.session.employer == undefined
                ? undefined
                : req.session.employer,
    });
});

router.get(`/forgetpass`, function (req, res) {
    res.render('pages/forgetpass', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        employer:req.session.employer== undefined? undefined: req.session.employer
    });
});

router.post(`/`, async (req, res) => {
    const Error = { emailerror: String, Passerror: String };

    const result = await User.findOne({ email: req.body.inputs.email });
    const empresult = await Employer.findOne({ email: req.body.inputs.email });

    if (result) {
        if (await bcrypt.compare(req.body.inputs.password, result.password)) {
            req.session.user = req.body.inputs.email;

            const result2 = await User.findOne({
                email: req.body.inputs.email,
            });
            console.log('result is :' + result2.cart);

            if (
                result2.cart != undefined &&
                req.session.cart != undefined &&
                result2.cart != ''
            ) {
                req.session.cart.items.push(result.cart);
            } else if (
                result2.cart != undefined &&
                req.session.cart == undefined &&
                result2.cart != ''
            ) {
                req.session.cart = {
                    items: [
                        {
                            id: String,
                            name: String,
                            image: String,
                            price: Number,
                            quantity: Number,
                        },
                    ],
                };

                req.session.cart.items = result2.cart;
            }

            res.send('true');
        } else {
            Error.Passerror = 'Please enter right password';
            res.send(Error);
        }
    } else if (empresult) {
        if (
            await bcrypt.compare(req.body.inputs.password, empresult.password)
        ) {
            req.session.employer = empresult.email;
            req.session.admin = empresult.isAdmin;

            res.send('employer');
        } else {
            Error.Passerror = 'Please enter right password';
            res.send(Error);
        }
    } else {
        Error.emailerror = 'Please enter right email';
        Error.Passerror = 'Please enter right email first';
        res.send(Error);
    }
});

module.exports = router;
