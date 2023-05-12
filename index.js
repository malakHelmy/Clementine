require('dotenv/config');

const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

//Routes
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');

// http://localhost:8080/api/v1/products
const api = process.env.API_URL;
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(morgan('tiny')); //displays log requests


app.use(express.static('public'));
app.set('view engine', 'ejs'); //set the template engine
app.use(express.urlencoded({ extended: true }));

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);

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

app.get(`/`, function (req, res) {
<<<<<<< HEAD
    res.render('pages/userprofile');
=======
    res.render('pages/index');
});
app.get(`/categories`, function (req, res)
{
    res.render('pages/categories');
>>>>>>> ac90f20cf3e11b5dcca74517c38d06e0a9f46831
});
app.listen(port, () => {
    console.log(api);
});
