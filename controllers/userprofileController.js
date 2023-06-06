const { Product } = require('../models/product');
const user = require('../models/user');
const { Order } = require('../models/order');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

exports.getOrders = asyncHandler(async (req, res) => {
    const userProfile = await user.findOne({ email: req.session.user });
    if (!userProfile) {
        console.log('user was not found');
        res.render('pages/404');
    }
    var userOrder = await Order.find({ userID: { $in: userProfile._id } });

    if (!userOrder) {
        console.log('no orders were found');
        res.render('pages/userprofileorder', {
            user: req.session.user == undefined ? undefined : userProfile,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
            orders: userOrder,
        });
    }
    res.render('pages/userprofileorder', {
        user: req.session.user == undefined ? undefined : userProfile,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        orders: userOrder,
    });
});

exports.getUserEditor = asyncHandler(async (req, res) => {
    const userProfile = await user.findOne({ email: req.session.user });
    if (!userProfile) {
        console.log('user was not found');
        res.render('pages/404');
    }
    res.render('pages/edituser', {
        user: req.session.user == undefined ? undefined : userProfile,
    });
});
exports.editUser = asyncHandler(async (req, res) => {
    let userProfile = await user.findOne({ email: req.session.user });

    let firstnamevalue = req.body.fname;

    let lastnamevalue = req.body.lname;
    console.log(lastnamevalue);
    let passvalue = req.body.cpass;
    let confirmpassvalue = req.body.newpass;
    let phonevalue = req.body.pnumber;
    let addressval = req.body.address;
    let emailvalue = req.body.email;

    let c = 0;
    let Error = {
        emailerror: '',
        passerror: '',
        confirmpasserror: '',
        phoneerror: '',
        addresserror: '',
    };
    if (firstnamevalue == '') {
        firstnamevalue = userProfile.firstname;
    }

    if (lastnamevalue == '') {
        lastnamevalue = userProfile.lastname;
    } else {
    }
    if (emailvalue == userProfile.email) {
        Error.emailerror = 'Email already exists';
    } else if (emailvalue == '') {
        Error.emailerror = '';
        emailvalue = userProfile.email;
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValid = emailPattern.test(emailvalue);
        if (isValid) {
        } else {
            Error.emailerror = 'Email is Invalid';
            c++;
        }
    }

    if (passvalue == '' && confirmpassvalue == '') {
        Error.passerror = '';
        passvalue = userProfile.password;
        confirmpassvalue = userProfile.password;
    } else {
        if (passvalue != '' && confirmpassvalue == '') {
            Error.confirmpasserror = 'Please enter your new Password';
            c++;
        } else if (passvalue == '' && confirmpassvalue != '') {
            Error.passerror = 'Please enter your current password';
            c++;
        } else if (confirmpassvalue != passvalue) {
            var passwordPattern =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            // Test the password against the pattern
            let passVal = await bcrypt.compare(passvalue, userProfile.password);
            if (passVal) {
                var isValid = passwordPattern.test(confirmpassvalue);
                if (isValid) {
                    confirmpassvalue = await bcrypt.hash(confirmpassvalue, 12);
                } else {
                    Error.confirmpasserror =
                        'password must contain at least 8 characters,one lowercase letter,one uppercase letter and one digit';
                    c++;
                }
            } else {
                Error.passerror = `This password doesn't match the current password`;
                c++;
            }
        }
        if (confirmpassvalue == passvalue) {
            Error.confirmpasserror =
                'Please enter a new different Password or leave both fields empty';
            c++;
        }
    }
    if (phonevalue != '') {
        if (phonevalue.length == 11 && !isNaN(phonevalue)) {
        } else {
            Error.phoneerror = 'Please enter right a phone number';
            c++;
        }
    }
    if (phonevalue == '') {
        Error.phoneerror = '';
        phonevalue = userProfile.phone;
    }
    if (addressval == '') {
        addressval = userProfile.address;
    } else if (addressval.length < 6 && addressval.length != 0) {
        Error.addresserror = 'Enter a valid address with more details';
        c++;
    }
    if (c == 0) {
        let updatedUser = await user.findOneAndUpdate(
            { _id: userProfile._id },
            {
                firstname: firstnamevalue,
                lastname: lastnamevalue,
                email: emailvalue,
                password: confirmpassvalue,
                phone: phonevalue,
                address: addressval,
            },
            { new: true }
        );
        console.log(updatedUser);
        res.redirect('back');
    } else {
        console.log(Error);
        res.redirect('back');
    }
});
