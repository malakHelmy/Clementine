const express = require('express');
const Employer = require('../models/employer');
const bcrypt = require('bcrypt');
const router = express.Router();

//handling the form submission
router.post('/', async (req, res) => {
    const namevalue = req.body.inputs.name;
    const passvalue = req.body.inputs.password;
    const confirmpassvalue = req.body.inputs.confirmpassword;
    const phonevalue = req.body.inputs.phone;
    const emailvalue = req.body.inputs.email;

    let c = 0;
    let Error = {
        nameerror: String,
        emailerror: String,
        passerror: String,
        confirmpasserror: String,
        phoneerror: String,
    };

    console.log(req.body.inputs);

    if (namevalue.trim() == '') {
        Error.nameerror = 'Please enter name';
        c++;
    }

    if (emailvalue == '') {
        Error.emailerror = 'Please enter Email';
        c++;
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValid = emailPattern.test(req.body.inputs.email);
        if (isValid) {
        } else {
            Error.emailerror = 'Email is Invalid';
            c++;
        }
    }

    if (passvalue == '') {
        Error.passerror = 'Please enter Password';
        c++;
    } else {
        var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

        // Test the password against the pattern
        var isValid = passwordPattern.test(req.body.inputs.password);
        if (isValid) {
        } else {
            Error.passerror =
                'password must contain at least 8 characters, one lowercase letter,one uppercase letter and one digit';
            c++;
        }
    }
    if (confirmpassvalue == '') {
        Error.confirmpasserror = 'Please enter Confirm Password';
        c++;
    } else if (confirmpassvalue != passvalue) {
        Error.confirmpasserror = 'Please enter Matching Password';
        c++;
    } else if (confirmpassvalue == passvalue) {
    }
    if (phonevalue.length == 11 && !isNaN(phonevalue)) {
    } else {
        Error.phoneerror = 'Please enter right a phone number';
        c++;
    }

    if (c == 0) {
        const user = {
            name: req.body.inputs.name,
            email: req.body.inputs.email,
            password: await bcrypt.hash(req.body.inputs.password, 12),
            phone: req.body.inputs.phone,
            isAdmin: req.body.inputs.isAdmin,
        };

        const newEmployer = new Employer(user);
        const check = Employer.findOne({ email: req.body.inputs.email })
            .then((result) => {
                if (result == undefined) {
                    newEmployer
                        .save()
                        .then(() => {
                            res.send('done');
                        })
                        .catch((error) => {
                            res.render('error.ejs', { error });
                        });
                } else {
                    Error.emailerror = 'existed email';
                    let err = {
                        firsterror: Error.firsterror,
                        lasterror: Error.lasterror,
                        emailerror: Error.emailerror,
                        passerror: Error.passerror,
                        confirmpasserror: Error.confirmpasserror,
                        phoneerror: Error.phoneerror,
                    };
                    res.send(err);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.send(Error);
    }
});

router.post('/checkemail', (req, res) => {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = emailPattern.test(req.body.email);
    if (isValid) {
        var query = { email: req.body.email };
        Employer.find(query)
            .then((result) => {
                if (result.length > 0) {
                    res.send('taken');
                } else {
                    res.send('available');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.send('wrong');
    }
});

module.exports = router;
