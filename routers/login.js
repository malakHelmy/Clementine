const express = require('express');
const session = require('express-session');
const Cart = require('../models/cart');
const User = require('../models/user');
const Employer = require('../models/employer');
const bcrypt = require('bcrypt');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.get(`/resetpassword/:token`, async (req, res) => {

    const result = await User.findOne({ email: req.session.reset});
    if(result)
    {

        res.render('pages/resetpass', {
            user: req.session.user == undefined ? undefined : req.session.user,
            cart: req.session.cart == undefined ? undefined : req.session.cart,
        });


    }
   else{
    res.send('Error occured')
   }
});

router.post(`/resetpassword`, async (req, res) => {

    if(req.body.email=='')
  {
    res.send('error')
  }
  else{
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = emailPattern.test(req.body.email);
    if(isValid){

        const result = await User.findOne({ email: req.body.email });
        if(result)
        {
            
            req.session.reset=req.body.email;
            const token = crypto.randomBytes(20).toString('hex');
            var currentDate = new Date();
            const doc = await User.findOneAndUpdate({email:req.body.email},
                 {
                    Token:token,
                    Tokenexpiry: currentDate.getTime() + (10 * 60 * 1000)
                 }, 
                 {
                new: true
              });
              console.log(doc);
            console.log(token);
            const resetLink = `http://localhost:8080/login/resetpassword/${token}`;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'clementineco2023@gmail.com',
                    pass: 'lmkwmjbyftpuzwhz',
                },
            });
            const mailOptions = {
            from: 'clementineco2023@gmail.com',
            to: req.body.email,
            subject: 'Password Reset',
            html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).json({ message: 'Failed to send email' });
            } else {
              res.json({ message: 'Email sent successfully' });
            }
          });



          res.send('done')
    
        }else{
            res.send('wrong')
        }

    }else{
    res.send('error')
    }

  } 
   

});

router.get(`/`, function (req, res) {
    res.render('pages/login', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});


router.get(`/forgetpass`, function (req, res) {
    res.render('pages/forgetpass', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});

router.post(`/`, async (req, res) => {

    const Error={emailerror:String,Passerror:String};

    const result = await User.findOne({ email: req.body.inputs.email });
    const empresult = await Employer.findOne({ email: req.body.inputs.email });

    if (result) {

        if (await bcrypt.compare(req.body.inputs.password, result.password)) {
            req.session.user = req.body.inputs.email;
            if (req.session.cart != undefined)
                req.session.cart.items.forEach((items) => {
                    items.email = req.session.user;
                });

            const result = await Cart.find({ email: req.body.email });
            console.log(result);
            if (result != undefined && req.session.cart != undefined) {
                result.forEach((items) => {
                    let c = 0;
                    req.session.cart.items.forEach((items2) => {
                        if (items.id == items2.id) {
                            items2.quantity += items.quantity;
                            c++;
                        }
                    });
                    if (c == 0) {
                        req.session.cart.items.push(items);
                    }
                });

            } else if (result != undefined && req.session.cart == undefined) {
                let c = 0;
                result.forEach((items) => {
                    if (c == 0) {
                        c++;
                        req.session.cart = {
                            items: [items],
                        };
                    } else {
                        req.session.cart.items.push(items);
                    }
                });
            }
            res.send('true');
        } else {
            Error.Passerror="Please enter right password";
            res.send(Error);
        }
    }else if(empresult){
    
        if (await bcrypt.compare(req.body.inputs.password, empresult.password)) {

            req.session.user=empresult.email;
            req.session.admin=empresult.isAdmin;
            res.send('employer')
            
        }else{
            Error.Passerror="Please enter right password";
            res.send(Error);
        }

    }else  {
        
         Error.emailerror="Please enter right email";
         Error.Passerror="Please enter right email first";
         res.send(Error);
    }

});

module.exports = router;
