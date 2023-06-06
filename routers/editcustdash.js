const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    if (req.session.admin != undefined) {
        User.find()
            .then(async (customerslist) => {
                res.render('pages/editcustdash', {
                    viewTitle: 'Customers',
                    users: customerslist,
                    isadmin: req.session.admin,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.render('pages/404');
    }
});

router.post('/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await User.findOneAndDelete({ _id: customerId });
        console.log(customerId);
        if (req.query.ajax)
            return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log('Error deleting customer:', error);
        res.status(500).json({
            error: 'Failed to delete customer, please try again.',
        });
    }
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('pages/updatedeletecust', {
                viewTitle: 'Update Customer',
                customer: result,
                isadmin: req.session.admin,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/update/:id', async (req, res) => {
    const customerId = req.params.id;
    const userProfile = await User.findOne({ _id: customerId });
    
    const updates = req.body.inputs;
    
    
    console.log( updates.lastname)
    let c = 0;
    let errors = {
        firsterror: String,
        lasterror: String,
        emailerror: String,
        passerror: String,
        confirmpasserror: String,
        phoneerror: String,
    };
    if (updates.firstname.length < 2 && updates.firstname != '') {
        errors.firsterror = 'Enter a valid first name';
        c++;
    } else if (updates.firstname == '') {
        updates.firstname = userProfile.firstname;
    }

    if (updates.lastname.length < 2 && updates.lastname != '') {
        errors.lasterror = 'Enter a valid last name';
        c++;
    } else if (updates.lastname == '') {
        updates.lastname = userProfile.lastname;
    }
    if (updates.email == '') {
        updates.email = userProfile.email;
    } else {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValid = emailPattern.test(updates.email);
        if (isValid) {
        } else {
            errors.emailerror = 'Email is Invalid';
            c++;
        }
    }
    if (updates.phone.length == 11 && !isNaN(phonevalue)) {
    } else if (updates.phone.length == 0) {
        updates.phone = userProfile.phone;
    } else {
        Error.phoneerror = 'Please enter right a phone number';
        c++;
    }
    if (updates.password != '' && updates.confirmpass == '') {
        errors.confirmpasserror = `Please enter the user's new Password`;
        c++;
    } else if (updates.confirmpass == updates.password) {
        if (updates.password == '' && updates.confirmpass == '') {
            updates.password = userProfile.password;
        } else {
            var passwordPattern =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            // Test the password against the pattern
            let passVal = await bcrypt.compare(
                updates.password,
                userProfile.password
            );
            if (!passVal) {
                var isValid = passwordPattern.test(updates.confirmpass);
                if (isValid) {
                    updates.password = await bcrypt.hash(updates.password, 12);
                    updates.confirmpass = await bcrypt.hash(
                        updates.confirmpass,
                        12
                    );
                } else {
                    errors.confirmpasserror =
                        'password must contain at least 8 characters,one lowercase letter,one uppercase letter and one digit';
                    errors.passerror =
                        'password must contain at least 8 characters,one lowercase letter,one uppercase letter and one digit';
                    c++;
                }
            }
        }
    } else {
        errors.confirmpasserror = `This confirm password doesn't match the password`;
        c++;
    }

    if (c == 0) {
        let newUser = await User.findByIdAndUpdate(customerId, updates);
        console.log(newUser);
        res.send('done');

    } else {
        console.log(errors);
        let err = {
            firsterror: errors.firsterror,
            lasterror: errors.lasterror,
            emailerror: errors.emailerror,
            passerror: errors.passerror,
            confirmpasserror: errors.confirmpasserror,
            phoneerror: errors.phoneerror,
        };
        res.send(err);
    }
});

module.exports = router;
