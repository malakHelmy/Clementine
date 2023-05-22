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
//poenai api key
const api_key= process.env.OPENAI_API_KEY;

//Routes
const editProdRouter= require('./routers/editproducts');
const cartRouter= require('./routers/cart');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const users_loginRouter = require('./routers/login');
const cust_contRouter = require('./routers/editcustdash');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const contactmailerRouter = require ('./routers/mailController');
const chatRouter = require('./routers/chat');

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

// Routers
app.use(`/`, productsRouter);
app.use(`/categories`, categoriesRouter);
app.use(`/orders`, ordersRouter);
app.use('/user', usersRouter);
app.use('/login', users_loginRouter);
app.use('/editcustdash', cust_contRouter);
app.use('/editproducts',editProdRouter);
app.use('/chat', chatRouter);
app.use('/cart', cartRouter);
mongoose
.connect("mongodb+srv://clementine:wifeys2023@clementine.xfv9xzu.mongodb.net/clementine?retryWrites=true&w=majority")
.then((result) => {
    console.log('database success');
})
.catch((err) => {
    console.log(err);
});


// app.use(fileUpload());
app.use(session({ secret: 'Your_secret_key' , saveUninitialized:false , resave:false}));

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
app.get(`/checkout`, function (req, res) {
    res.render('pages/checkout', {
        user: req.session.user === undefined ? '' : req.session.user,
    });
});
app.get(`/wishlist`, function (req, res) {
    res.render('pages/wishlist', {
        user: req.session.user === undefined ? '' : req.session.user,
    });
});

/* --------- DASHBOARDS -----*/
app.get(`/dashboard`, function (req, res) {
    res.render('pages/dashboard');
});
app.get(`/editproducts`, function (req, res) {
    res.render('pages/editproducts');
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

/* ---------CONTACT US FORM MAILER END --------*/

app.listen(port, () => {
    console.log("http://localhost:8080");
});
