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
    let Errors = {
      nameerror: String,
      emailerror: String,
      passerror: String,
      phoneerror: String,
    };

    console.log(req.body.inputs);

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValidEmail = emailPattern.test(req.body.inputs.email);
    if (isValidEmail) {
    } else {
      Errors.emailerror = 'Email is Invalid';
      c++;
    }

    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    var isValidPassword = passwordPattern.test(req.body.inputs.password);
    if (isValidPassword) {
    } else {
      Errors.passerror =
        'Password must contain at least 8 characters, one lowercase letter, one uppercase letter and one digit';
      c++;
    }

    if (phonevalue.length == 11) {
    } else {
      Errors.phoneerror = 'Please enter a valid phone number';
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

      const check = await Employer.findOne({ email: req.body.inputs.email });
      if (check) {
        Errors.emailerror = 'Email already exists';
        res.send(Errors);
      } else {
        employer.set(user);
        await employer.save();
        res.send('done');
      }
    } else {
      res.send(Errors);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
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
