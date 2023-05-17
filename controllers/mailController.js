
/* const nodemailer = require('nodemailer');
const hbars = require('nodemailer-express-handlebars');
const {resolveHostname} = require('nodemailer/lib/shared');
const Mailgen = require('mailgen');
const contactuser = require(/js/contactus);



var fullname = req.body.name;
var uemail = req.body.email;
var subject = req.body.subject;
var message = req.body.message;


var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
     user: 'clementineco2023@gmail.com',
     pass: 'lmkwmjbyftpuzwhz'
 }

})

var mailOptions = {
 from: uemail,
 to: 'clementineco2023@gmail.com',
 subject: subject,
 text: message

}


transporter.sendMail(mailOptions, function(error, info) {
 if(error) {
     console.log(error);
  //   res.send('Error.');
 } else {
     console.log('Email sent:' + info.response);
   //  res.send('Successfully sent.')

 }
 express.response.redirect("/")
})

*/