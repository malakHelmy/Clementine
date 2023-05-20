const { default: mongoose } = require("mongoose");
const { order } = require('../models/order');
const { user } = require('../models/user');


const paymentDetails = mongoose.Schema({
    
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
        ref: 'order',
    },

    CreditCardNumber: {
        type: Number,
        required: true,
    },
    exp_month: {
        type: Number,
        required: true,
    },
    exp_year:{
        type: Number,
        required: true,
    },
    cvv: {
        type: Number,
        required: true,
    }

},
{ timestamps: true });



exports.PaymentGateway  = mongoose.model('PaymentGateway', paymentDetails);