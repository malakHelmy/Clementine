const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');

router.get('/:id', async (req, res) => {
  try {
    if (req.session && req.session.admin === true) {
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

    if (!req.body || !req.body.inputs) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const { name, email, password, confirmpassword, phone, isAdmin } = req.body.inputs;

    employer.name = name;
    employer.email = email;
    employer.password = password;
    employer.phone = phone;
    employer.isAdmin = isAdmin === 'on';

    let c = 0;
    let Errors = {
      nameerror: '',
      emailerror: '',
      passerror: '',
      confirmpasserror: '',
      phoneerror: '',
    };

    console.log(req.body.inputs);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);
    if (isValidEmail) {
    } else {
      Errors.emailerror = 'Email is Invalid';
      c++;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const isValidPassword = passwordPattern.test(password);
    if (isValidPassword) {
    } else {
      Errors.passerror =
        'Password must contain at least 8 characters, one lowercase letter, one uppercase letter and one digit';
      c++;
    }

    if (password === confirmpassword) {
    } else {
      Errors.confirmpasserror = 'Passwords do not match';
      c++;
    }

    if (phone.length == 11) {
    } else {
      Errors.phoneerror = 'Please enter a valid phone number';
      c++;
    }

    if (c == 0) {
      const user = {
        name,
        email,
        password: await bcrypt.hash(password, 12),
        phone,
        isAdmin,
      };

      const check = await Employer.findOne({ email });
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
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);
    if (!isValidEmail) {
      return res.json({ emailerror: 'Email is Invalid' });
    }
    Employer.findOne({ email }, (err, employer) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
      }
      if (employer) {
        return res.json({ emailerror: 'Email already exists' });
      }
      return res.json({});
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;