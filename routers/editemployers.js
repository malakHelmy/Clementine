const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');

router.get('/:id', async (req, res) => {
  try {

    if (req.session.admin == true) {
      const employer = await Employer.findById(req.params.id);
      if (!employer) {
        return res.status(404).json({ error: 'Employer not found' });
      }
      res.render('pages/editemployers', { employer, isadmin: true });

    } else {
      res.render('pages/404');
    }


  } catch (err) {
    console.error(err);
    res.status(404).render('pages/404');
  }
});

router.post('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' });
    }

    employer.name = req.body.name;
    employer.email = req.body.email;
    employer.password = req.body.password;
    employer.phone = req.body.phone;
    employer.isAdmin = req.body.isAdmin === 'on';

    const namevalue = req.body.inputs.name;
    const passvalue = req.body.inputs.password;
    const phonevalue = req.body.inputs.phone;
    const emailvalue = req.body.inputs.email;

    let c = 0;
    let Error = {
      nameerror: String,
      emailerror: String,
      passerror: String,
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

    await employer.save();
    res.redirect('/employersdash');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
