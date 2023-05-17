require('dotenv/config');

const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const nodemailer = require('nodemailer');
const hbars = require('nodemailer-express-handlebars');
const Mailgen = require('mailgen');

//Routes
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const users_loginRouter = require('./routers/login');
const cust_contRouter = require('./routers/editcustdash');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const contactmailerRouter = require ('./routers/mailController')
// const fileUpload = require('express-fileupload');

// http://localhost:8080/api/v1/products
const api = process.env.API_URL;
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(morgan('tiny')); //displays log requests

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); //set the template engine
//app.use(express.static(path.join(process.cwd(), "/images")));
app.use(express.urlencoded({ extended: true }));

//Routers
app.use(`/products`, productsRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/orders`, ordersRouter);
app.use('/user', usersRouter);
app.use('/login', users_loginRouter);
app.use('/editcustdash', cust_contRouter);


mongoose
    .connect(process.env.DB_URI)
    .then((result) => {
        console.log('database success');
    })
    .catch((err) => {
        console.log(err);
    });

// app.use(fileUpload());
app.use(session({ secret: 'Your_secret_key' }));

app.get(`/`, function (req, res) {
    res.render('pages/index', {
        user: req.session.user === undefined ? '' : req.session.user,
    });
});
app.get(`/home`, function (req, res) {
    res.render('pages/index', {
        user: req.session.user === undefined ? '' : req.session.user,
    });
});
app.get(`/categories`, function (req, res) {
    res.render('pages/categories', {
        user: req.session.user === undefined ? '' : req.session.user,
    });
});
app.get(`/drings`, function (req, res) {
    res.render('pages/products', {
        user: req.session.user === undefined ? '' : req.session.user,
    });
});

/* --------- DASHBOARDS -----*/
app.get(`/dashboard`, function (req, res) {
    res.render('pages/dashboard');
});
app.get(`/editcustdash`, function (req, res) {
    res.render('pages/editcustdash');
});
app.post(`/editcustdash`, function (req, res) {
    res.render('pages/editcustdash');
});
app.get(`/updatecustdash`, function (req, res) {
    res.render('pages/updatecustdash');
});
app.get(`/userprofile`, function (req, res) {
    res.render('pages/userprofile', {
        user: req.session.user === undefined ? '' : req.session.user,
    });
});
/* --------- DASHBOARDS END -----*/

/* --------- SIGN UP AND LOG IN ---*/
app.get(`/signup`, function (req, res) {
    res.render('pages/signup', {
        user: req.session.user === undefined ? '' : req.session.user,
    });
});

app.get(`/login`, function (req, res) {
    res.render('pages/login');
});
app.post('/sign-up-action', (req, res) => {});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
/* --------- SIGN UP AND LOG IN END ---*/

/* --------- CHATPOT API ----------*/

app.get(`/chat`, function (req, res) {
    res.render('pages/chatbot');
});

/* --------- CHATPOT API END----------*/

/* ---------CONTACT US FORM MAILER --------*/
app.get(`/contactus`, function (req, res) {
    res.render('pages/contactus');
});

app.post(`/contactus`, function (req, res) {
    res.render('pages/contactus');

    var fullname = req.body.name;
    var uemail = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'clementineco2023@gmail.com',
            pass: 'lmkwmjbyftpuzwhz',
        },
    });

    var mailOptions = {
        from: uemail,
        to: 'clementineco2023@gmail.com',
        subject: subject,
        text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('Error.');
        } else {
            console.log('Email sent:' + info.response);
            res.send('Successfully sent.');
        }
        express.response.redirect('/');
    });
});
/* ---------CONTACT US FORM MAILER END --------*/

app.listen(port, () => {
    console.log(api);
});
