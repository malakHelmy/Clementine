const express = require('express');
const Cart = require('../models/cart');
const { Product } = require('../models/product');
const { Order } = require('../models/order');
const user = require('../models/user');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

// router.post('/checkout', checkoutController.checkoutCont);

router.post('/', async (req, res) => {
  
     
    if(req.session.user != undefined){
        const {
            userfullname,
            shippingAddress1,
            city,
            state,
            zip,
            CreditCardNumber,
            exp_month,
            exp_year,
            cvv,
        } = req.body.inputs;
        
        let Error = {
            userFullName: String,
            shippingAddress1: String,
            city: String,
            state: String,
            zip: String,
            CreditCardNumber: String,
            exp_month: String,
            exp_year: String,
            cvv: String,
        };
        let totalAmountfinal = 0;
        if (req.session.cart != undefined) {
            req.session.cart.items.forEach((items) => {
                if (items.quantity > 1) {
                    totalAmountfinal += items.price * items.quantity;
                } else {
                    totalAmountfinal += items.price;
                }
            });
            totalAmountfinal += 100;
        }
        try {
            // adding the new order to the user's list of orders
            let User = await user.findOne({ email: req.session.user });
            let products = [];
            let cart = req.session.cart;
            cart.items.forEach((items) => {
                products.push(items.id);
            });
    
            console.log(products);
            const productinCart = await Product.find({
                _id: { $in: products },
            });
            console.log(productinCart);
            if (!User) {
                res.status(404);
                console.log('Cannot find user');
            }

            const cardformat = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
            let count = 0;
    
            if (!userfullname) {
                Error.userFullName = 'Full name is required';
                count++;
            }
    
            if (!shippingAddress1) {
                Error.shippingAddress1 = 'Address is required';
                count++;
            }
    
            if (!city) {
                Error.city = 'City is required';
                count++;
            }
    
            if (state == 'selectstate'  ) {
                Error.state = 'City is required';
                count++;
            }
    
            if (!zip) {
                Error.zip = 'Zip is required';
                count++;

            } else if (zip.length < 4 || isNaN(zip)) {
                Error.zip = 'Zip code must be 4 integers long.';
                count++;
            }
    
            if (!CreditCardNumber) {
                Error.CreditCardNumber = 'Credit card number is required';
                count++;
            } else if (!CreditCardNumber.match(cardformat)) {
                Error.CreditCardNumber = 'Invalid credit card number';
                count++;
            }
    
            if (exp_month == '') {
                Error.exp_month = 'Expiry month is required';
                count++;
            }

            if (exp_year == "selectyear") {
                Error.exp_year = 'Expiry year is required';
                count++;
            }
            if (!cvv) {
                Error.cvv = 'CVV number is required';
                count++;
            } else if (cvv.length != 3  || isNaN(cvv)) {
                Error.cvv = 'CVV number must be 3 integers long';
                count++;
            }

            if (count > 0) {
                
                console.log(Error);
                res.send(Error);
            } else {
                let order = new Order({
                    userID: User._id,
                    userFullName: User.firstname + ' ' + User.lastname,
                    orderItems: productinCart,
                    city: city,
                    shippingAddress1: shippingAddress1,
                    CreditCardNumber: CreditCardNumber,
                    exp_month: exp_month,
                    state: state,
                    zip: zip,
                    totalAmount: totalAmountfinal,
                });
    
                productinCart.forEach(async (product) => {
                    await Product.findOneAndUpdate(
                        { _id: product._id },
                        {
                            countInStock:
                                parseInt(product.countInStock) -
                                parseInt(
                                    cart.items.find(
                                        (item) => item.id == product._id
                                    ).quantity
                                ),
                        },
                        { new: true }
                    );
                });
    
                //$push adds the order id to the orders array in the user schema
                await user.findOneAndUpdate(
                    { email: req.session.user },
                    { $push: { orders: order._id } },
                    { new: true }
                );

                await order.save();
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'clementineco2023@gmail.com',
                        pass: 'lmkwmjbyftpuzwhz',
                    },
                });
                var mailOptions = {
                    from: 'clementineco2023@gmail.com',
                    to: req.session.user,
                    subject: 'Order Confirmation',
                    html: ejs.render(
                        `
                    <p>Dear ${order.userFullName},</p>
                    <p>Thank you for your order of ${order.orderItems.length} item(s) for a total of EGP ${order.totalAmount}.</p>
                    <p>Your order includes:</p>
                    <ul>
                      <% order.orderItems.forEach(function(item) { %>
                        <li><%= item.name %></li>
                      <% }); %>
                    </ul>
                    <p>We have received your order and are processing it now. We will notify you by email once your order has been shipped.</p>
                    <p>You can keep track of your order through its ID: ${order._id}</p>
                    <p>Thank you for choosing us.</p>
                    <p>With love,</p>
                    <p>Clementine.</p>`,
                        { order: order }
                    ),
                };
    
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        return res.send('Error.');
                    } else {
                        console.log('Email sent:' + info.response);
                        // Save the order details to your database or perform other actions as needed
                    }
                });
                req.session.cart = undefined;
                // res.render('pages/placedOrder', {
                //     order,
                //     user:
                //         req.session.user == undefined
                //             ? undefined
                //             : req.session.user,
                //     employer:
                //         req.session.employer == undefined
                //             ? undefined
                //             : req.session.employer,
                //     cart: req.session.cart,
                // });
                console.log('order placed successfuly.');
                res.send('done')
            }
        } catch (err) {
            console.error(err);
            res.render('pages/404');
        }
     } 
   
});

router.get(`/`, function (req, res) {
    if(req.session.user != undefined){

        if (req.session.cart == undefined) {
            res.render('pages/checkout', {
                user: req.session.user == undefined ? undefined : req.session.user,
                employer:
                    req.session.employer == undefined
                        ? undefined
                        : req.session.employer,
                cart: req.session.cart == undefined ? undefined : req.session.cart,
                totalamount: undefined,
                errors: {},
                employer:req.session.employer== undefined? undefined: req.session.employer
            });
        } else {
            let totalAmount = 0;
    
            req.session.cart.items.forEach((items) => {
                if (items.quantity > 1) {
                    totalAmount += items.price * items.quantity;
                } else {
                    totalAmount += items.price;
                }
            });
            totalAmount += 100;
            res.render('pages/checkout', {
                user: req.session.user == undefined ? undefined : req.session.user,
                employer:
                    req.session.employer == undefined
                        ? undefined
                        : req.session.employer,
                cart: req.session.cart == undefined ? undefined : req.session.cart,
                totalamount: totalAmount,
                errors: {},
                employer:req.session.employer== undefined? undefined: req.session.employer
            });
        }

    }else{
        res.render('pages/checkerror');
    }
   
});

module.exports = router;
