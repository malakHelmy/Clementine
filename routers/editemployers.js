const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');
const bcrypt = require('bcrypt');

router.get('/:id', async (req, res) => {
  try {
    if (req.session && req.session.admin === true) {
      const employer = await Employer.findById(req.params.id);
      if (!employer) {
        return res.status(404).json({ error: 'Employer not found' });
      }
      res.render('pages/editemployers', { employer , isadmin: true });
    } else {
      res.redirect('/404');
    }
  } catch (err) {
    console.error(err);
    res.status(404).redirect('/404');
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

    let c = 0;
    let Errors = {
      nameerror: '',
      emailerror: '',
      passerror: '',
      confirmpasserror: '',
      phoneerror: '',
    };

    let nameval = req.body.inputs.name;
    let passval = req.body.inputs.password;
    let confirmpassval = req.body.inputs. confirmpassword;
    let phoneval = req.body.inputs. phone;
    let isadminval = req.body.inputs.isAdmin;
    let emailval = req.body.inputs.email;

   
   if(email ==''){

     emailval=employer.email;

   }else{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);
      if (isValidEmail) {
    } else {
      Errors.emailerror = 'Email is Invalid';
      c++;
    }
   }

   if(password==''){
    passval=employer.password

   }else{
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const isValidPassword = passwordPattern.test(password);
      if (isValidPassword) {
        passval=await bcrypt.hash(password, 12);
        } else {
          Errors.passerror = 'Password must contain at least 8 characters, one lowercase letter, one uppercase letter and one digit';
         c++;
        }
   }
    if (confirmpassword == '' && password == '') {

    } else if(confirmpassword == password  && password!=''){

    }else{
      Errors.confirmpasserror = 'Passwords do not match';
      c++;
    }
     if(phone == '')
     {
      phoneval=employer.phone;
     }
    else  {

      if(phone.length ==11  && !isNaN(phone))
      {
        phoneval=phone;
        
      }else{
        Errors.phoneerror = 'Please enter a valid phone number';
        c++;
      }

    } 

    if (c == 0) {
      

      let updatedUser = await Employer.findOneAndUpdate(
        { _id: employer._id },
        {
           name:nameval,
            email:emailval  ,
            password:passval,
            phone:phoneval,
            isAdmin,
            
        },
        { new: true })
        res.send('done');
    }
     else {
      res.send(Errors);
    }
  } catch (err) {

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