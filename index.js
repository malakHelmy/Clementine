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

// for auto refresh
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

//openai API key
const api_key = process.env.OPENAI_API_KEY;

//Routes
const dashboardRouter = require('./routers/dashboard');

const addProdRouter = require('./routers/addproducts');
const editProdRouter = require('./routers/editproducts');
const cartRouter = require('./routers/cart');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const userprofileRouter = require('./routers/userprofiles');
const users_loginRouter = require('./routers/login');
const cust_contRouter = require('./routers/editcustdash');
const categoriesRouter = require('./routers/categories');
const ordersRouter = require('./routers/orders');
const contactmailerRouter = require('./routers/mailController');
const chatRouter = require('./routers/chat');
const displayProdRouter = require('./routers/displayproducts');
const searchRoutes = require('./routers/searchbar');
const logoutroute = require('./routers/logout');
const employersRouter = require('./routers/employersdash');
const addempRouter = require('./routers/addemployers');
const editempRouter = require('./routers/editemployers');
const checkoutRouter = require('./routers/checkout');
const addcustRouter = require('./routers/addcustomers');



//const updatecustRoute = require('./routers/updatedeletecust');
// http://localhost:8080/api/v1/products

const api = process.env.API_URL;
const app = express();
const port = process.env.PORT || 8080;

// for auto refresh
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

app.use(connectLivereload());

liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});

// middleware
app.use(express.json());
app.use(morgan('tiny')); //displays log requests

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); //set the template engine
//app.use(express.static(path.join(process.cwd(), "/images")));
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'Your_secret_key',
        saveUninitialized: false,
        resave: false,
    })
);
// Routers
app.use('/addproducts', addProdRouter);
app.use('/employersdash', employersRouter);
app.use('/', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/ordersdash', ordersRouter);
app.use('/user', usersRouter);
app.use('/userprofile', userprofileRouter);
app.use('/login', users_loginRouter);
app.use('/editcustdash', cust_contRouter);
app.use('/editproducts', editProdRouter);
app.use('/chat', chatRouter);
app.use('/cart', cartRouter);
app.use('/displayproducts', displayProdRouter);
app.use('/', searchRoutes);
app.use('/logout', logoutroute);
app.use('/addemployers', addempRouter);
app.use('/editemployers', editempRouter);
app.use('/checkout', checkoutRouter);
app.use('/addcustomers', addcustRouter);
app.use('/dashboard', dashboardRouter);



const { Product } = require('./models/product');
const { OrderItem } = require('./models/order-items');

//app.use('/updatedeletecust', updatecustRoute);
mongoose
    .connect(
        'mongodb+srv://clementine:wifeys2023@clementine.xfv9xzu.mongodb.net/clementine?retryWrites=true&w=majority'
    )
    .then((result) => {
        console.log('database connection success');
    })
    .catch((err) => {
        console.log(err);
    });

app.get(`/`, async (req, res) => {
    const product = await Product.find()
        .sort({ date: -1 })
        .limit(10) // retrieve only 10 products
        .then((result) => {
            const product = result.length > 0 ? result : null; // check if newIn products are available
            res.render('pages/index', {
                product, // pass the products to the template
                user:
                    req.session.user == undefined
                        ? undefined
                        : req.session.user,
                cart:
                    req.session.cart == undefined
                        ? undefined
                        : req.session.cart,
            });
        });
});

app.get(`/home`, function (req, res) {
    res.render('pages/index', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart:
            req.session.cart.items == undefined
                ? undefined
                : req.session.cart.items,
    });
});

app.get(`/categories`, function (req, res) {
    res.render('pages/categories', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});
app.get(`/checkout`, function (req, res) {
    res.render('pages/checkout', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});
app.get(`/wishlist`, function (req, res) {
    res.render('pages/wishlist', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});

app.get('/search', function (req, res) {
    res.render('pages/search', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});

app.get('/contactus', function (req, res) {
    res.render('pages/contactus', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});

/* --------- DASHBOARDS -----*/
app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,

        currentPage: 'dashboard'
    });
});

app.get('/addproducts', (req, res) => {
    res.render('pages/addproducts');
});

app.get(`/editproducts`, function (req, res) {
    res.render('pages/editproducts');
});

app.get(`/editcustdash`, function (req, res) {
    res.render('pages/editcustdash');
});

app.get(`/addcustomers`, function (req, res) {
    res.render('pages/addcustomers');
});

app.get(`/updatedeletecust`, function (req, res) {
    res.render('pages/updatedeletecust');
});

app.get(`/updateorder`, function (req, res) {
    res.render('pages/updateorder');
});
app.get(`/ordersdash`, function (req, res) {
    res.render('pages/ordersdash');
});
app.get(`/myprofile`, function (req, res) {
    res.render('pages/myprofile', {
        user: req.session.user == undefined ? undefined : req.session.user,

    })
})
app.get(`/userprofile`, function (req, res) {
    res.render('pages/userprofile', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
    });
});
app.get(`/userprofileorder`, (req, res) => {
    res.render('pages/userprofileorder', {
        user: req.session.user == undefined ? undefined : req.session.user,
    })
})
app.get(`/displayproducts`, function (req, res) {
    res.render('pages/displayproducts');
});
app.get(`/employersdash`, function (req, res) {
    res.render('pages/employersdash');
});
app.get(`/addemployers`, function (req, res) {
    res.render('pages/addemployers');
});
app.get(`/editemployers`, function (req, res) {
    res.render('pages/editemployers');
});

/* --------- DASHBOARDS END -----*/

/* --------- SIGN UP AND LOG IN ---*/
app.get(`/signup`, function (req, res) {
    res.render('pages/signup', {
        user: req.session.user == undefined ? undefined : req.session.user,
        cart: req.session.cart == undefined ? undefined : req.session.cart,
        error:undefined
    });
});

app.post('/sign-up-action', (req, res) => { });
/* --------- SIGN UP AND LOG IN END ---*/
//CONTACT US MAILER START

app.post(`/contactus`, function (req, res) {
    // res.render('pages/contactus');

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

    app.post('/updateorder', function (req, res) {
        var orderId = req.body._id;
        var status = req.body.status;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'clementineco2023@gmail.com',
                pass: 'lmkwmjbyftpuzwhz',
            },
        });

        var mailOptions = {
            from: 'clementineco2023@gmail.com',
            to: req.body.email,
            subject: 'Order Confirmation',
            html: ejs.render(
                `
      <p>Dear <%= userFullName %>,</p>
      <p>Thank you for your order of <%= quantity %> <%= orderItem %>(s) for a total of <%= price %>.</p>
      <p>We have received your order and are processing it now. We will notify you by email once your order has been shipped.</p>
      <p>Thank you for choosing us!</p>
    `,
                { userFullName, quantity, OrderItem, price }
            ),
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.send('Error.');
            } else {
                console.log('Email sent:' + info.response);
                // Save the order details to your database or perform other actions as needed
                return res.redirect('/');
            }
        });
    });

app.listen(port, () => {
    console.log('http://localhost:8080');
});