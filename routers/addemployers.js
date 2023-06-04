const express = require('express');
const Employer = require('../models/employer');
const bcrypt=require('bcrypt')
const router = express.Router();



//handling the form submission
router.post('/',async (req, res) => {
 

  const user={
    name:req.body.name,
    email:req.body.email,
    password: await bcrypt.hash(req.body.password,12),
    phone:req.body.phone,
    isAdmin:Boolean(isAdmin)
  }

  const newEmployer = new Employer(user);
  newEmployer.save()
    .then(() => {
      res.redirect('/employersdash'); 
    })
    .catch((error) => {
      res.render('error.ejs', { error }); 
    });
});

router.post('/checkemail', async  (req, res) => {
 
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var isValid = emailPattern.test(req.body.email);
  if(isValid)
  {
    var query = { email: req.body.email };
    Employer.find(query)
        .then(result => {
            if (result.length > 0) {
                res.send('taken');
            }
            else {
                res.send('available');
            }
        })
        .catch(err => {
            console.log(err);
        });
  }else{
    res.send('wrong');
  }
});


module.exports = router;
