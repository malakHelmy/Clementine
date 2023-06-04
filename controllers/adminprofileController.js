const { Product } = require('../models/product');
const user = require('../models/user');
const { Order } = require('../models/order');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


exports.editAdmin = asyncHandler(async (req, res) => {
    let adminprof = await user.findOne({ email: req.session.user });

    let passvalue = req.body.cpass;
    let confirmpassvalue = req.body.newpass;
    let phonevalue = req.body.pnumber;
    let emailvalue = req.body.email;

    let c = 0;
    let Error = {
        emailerror: '',
        passerror: '',
        confirmpasserror: '',
        phoneerror: '',
    };
 
    
    if (emailvalue == adminprof.email) {
        Error.emailerror = 'Email already exists';
    } else if (emailvalue == '') {
        Error.emailerror = '';
        emailvalue = adminprof.email;
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValid = emailPattern.test(emailvalue);
        if (isValid) {
            
        } else {
            Error.emailerror = 'Email is Invalid';
            c++;
            emailvalue = adminprof.email;
        }
    }

    if (passvalue == '' && confirmpassvalue == '') {
        Error.passerror = '';
        passvalue = adminprof.password;
        confirmpassvalue = adminprof.password;
    } else {
        if (passvalue != '' && confirmpassvalue == '') {
            Error.confirmpasserror = 'Please enter your new Password';
            c++;
            confirmpassvalue = adminprof.password;
        } else if (passvalue == '' && confirmpassvalue != '') {
            Error.passerror = 'Please enter your current password';
            c++;
            passvalue = adminprof.password;
            confirmpassvalue = adminprof.password;
        } else if (confirmpassvalue != passvalue) {
            var passwordPattern =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            // Test the password against the pattern
            let passVal = await bcrypt.compare(passvalue, adminprof.password);
            if (passVal) {
                var isValid = passwordPattern.test(confirmpassvalue);
                if (isValid) {
                } else {
                    Error.confirmpasserror =
                        'password must contain at least 8 characters,one lowercase letter,one uppercase letter and one digit';
                    c++;
                    confirmpassvalue = adminprof.password;
                }
            } else {
                Error.passerror = `This password doesn't match the current password`;
                c++;
                passVal = adminprof.password;
                confirmpassvalue = adminprof.password;
            }
        }
        if (confirmpassvalue == passvalue) {
            Error.confirmpasserror =
                'Please enter a new different Password or leave both fields empty';
            c++;
            passvalue = adminprof.password;
            confirmpassvalue = adminprof.password;
        }
    }
    if (phonevalue != '') {
        if (phonevalue.length == 11 && !isNaN(phonevalue)) {
        } else {
            Error.phoneerror = 'Please enter right a phone number';
            c++;
            phonevalue = adminprof.phone;
        }
    }
    if (phonevalue == '') {
        Error.phoneerror = '';
        phonevalue = adminprof.phone;
    }
   
    if (c == 0) {
        let updatedAdmin = await user.findOneAndUpdate(
            { _id: adminprof._id },
            {
                email: emailvalue,
                password: confirmpassvalue,
                phone: phonevalue,
            },
            { new: true }
        );
        console.log(updatedAdmin);
        res.redirect('back');
    } else {
        res.redirect('back');
    }
});
