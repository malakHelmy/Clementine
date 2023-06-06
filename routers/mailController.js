const hbars = require('nodemailer-express-handlebars');
const { resolveHostname } = require('nodemailer/lib/shared');
const Mailgen = require('mailgen');
const express=require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ejs = require('ejs');



router.post('/', async (req, res) => {
  
    const { name, subject, email, message } = req.body;
    console.log("email is " + req.body.email);
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'clementineco2023@gmail.com',
        pass: 'lmkwmjbyftpuzwhz'
      }
    });
  
    const mailOptions = {
      from: req.body.email,
      to: 'clementineco2023@gmail.com',
      subject: `Message from ${req.body.email}: ${subject}`,
      text: `Name: ${name}\n${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error.');
      } else {
        console.log('Email sent:' + info.response);
        res.render('pages/contactus');
        // res.status(200).send('Successfully sent.');
      }
    });
  })
    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         api_key: 'pubkey-c479846ae49e80d7ebc81bb871acfdd6',
    //         domain: 'sandboxe19a2e0ab2154778abca9d2d22bf130d.mailgun.org',
    //     },
    // });

    // var mailOptions = {

    //     from: uemail,
    //     to: 'clementineco2023@gmail.com',
    //     subject: subject,
    //     text: message,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //         res.send('Error.');
    //     } else {
    //         console.log('Email sent:' + info.response);
    //         res.send('Successfully sent.');
    //     }
    //     res.redirect('/');
    // });

module.exports = router;
