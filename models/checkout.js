const mongoose = require('mongoose');
const { order } = require('../models/order');
const { user } = require('../models/user');
const checkoutSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            ref: 'user',
        },
        userFullName: {
            type: String,
            required: true,
        },
      
        totalAmount: {
        type: Number,
         required: true,
           default: 0,
           ref: 'order',
            },
        email: String,
        exp_month: {
            type: Number,
            equired: true,
            },
            exp_year:{
            type: Number,
            required: true,
             },
             cvv: {
            type: Number,
            required: true,
                }
});

/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in other files using the 'require' method,
exporting method #1*/
module.exports = mongoose.model('PaymentDetails', checkoutSchema);
