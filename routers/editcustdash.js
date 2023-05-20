
const express = require('express');
const User = require('../models/user');
const router = express.Router();
const customersController= require('../controllers/customersController');

router.post(`/`, async (req, res) => {

  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  }
  const users = new User(user);
  users
    .save()
    .then((result) => {
   
      res.render('pages/editcustdash');
    })
    .catch(err => {
      console.log(err);
    });
});



router.get(`/`, async (req, res) => {

    User.find()
    .then(async (customerslist) => {          
    res.render('pages/editcustdash', {
      viewTitle: "Customers List",
      users: customerslist
    })
    })

    .catch((err) => {
        
      console.log(err);
    });
  });

 router.get(`/:id`, (req,res)=>{


        User.
        findById(req.params.id).
        then((result)=>{
            res.render('pages/updatedeletecust',{customer:result})
        }).catch((err)=>{console.log(err);})
 });

module.exports = router;
