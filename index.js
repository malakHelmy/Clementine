require('dotenv/config');

const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


//Routes
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const fileUpload = require('express-fileupload');

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
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/orders`, ordersRouter);
app.use(`${api}/users`, usersRouter);

//Database connection
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'clementine',
    })
    .then(() => {
        console.log('database connection succeeded');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.urlencoded({extended: true}));

app.use(fileUpload());
app.use(session({ secret: 'Your_secret_key'}))


app.get(`/`, function (req, res) {
    res.render('pages/index', { user: (req.session.user === undefined ? "" : req.session.user)});
});
app.get(`/categories`, function (req, res) {
    res.render('pages/categories', { user: (req.session.user === undefined ? "" : req.session.user)});
});
app.get(`/userprofile`, function (req, res) {
    res.render('pages/userprofile', { user: (req.session.user === undefined ? "" : req.session.user)});
});
app.get(`/signup`, function (req, res) {
    res.render('pages/signup', { user: (req.session.user === undefined ? "" : req.session.user)});
});
// app.get(`/dashboard`, (req, res) => {
//     if (req.session.user !== undefined) {
//         if (req.session.user.type === 'admin') {
//             Admins.find().then( result => {
//                 res.render('pages/dashboard', {employees : result, user: (req.session.user === undefined ? "" : req.session.user)});

//             })
//             .catch(err => {
//                 console.log(err);
//             });
//         }
//         else {
//             res.send("Acess Denied.")
//         }
//     }
//     else {
//         res.send("Access Denied.")
//     }
// });

// app.post('/profile', (req, res) => {
// })
app.get(`/dashboard`, function (req, res) {
    res.render('pages/dashboard');
});
app.get(`/contactus`, function (req, res) {
    res.render('pages/contactus');
});
app.get(`/login`, function (req, res) {
    res.render('pages/login');
});
app.get(`/chat`, function (req, res) {
    res.render('pages/chatbot');
});
app.post('/sign-up-action', (req,res)=>{

})

app.get('/logout', (req, res) => {
req.session.destroy();
res.redirect('/');
})
app.listen(port, () => {
    console.log(api);
});