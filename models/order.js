const mongoose = require('mongoose');
const { User } = require('../models/user');
const orderitems = require('../models/order-items');

const orderSchema = mongoose.Schema({

    // referring to the user who orderedFF
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    userFullName: {
        type: String,
        required: true,
        ref: 'users',

    },
    // other fields...

//order is referrig to order items
orderItems: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
],

    shippingAddress1: {
    type: String,
        required: true,
    },

city: {
    type: String,
        required: true,
    },
state: {
    type: String,
        required: true,
    },
zip: {
    type: String,
        required: true,
    },
status: {
    type: String,
        required: true,
        default: 'Pending',
    },
totalAmount: {
    type: Number,
        required: true,
        default: 0,
    },

// phone_num: {
//     type: String,
//         required: true,
//     },
dateOrdered: {
    type: Date,
        default: Date.now,
    },
}, { timestamps: true });


// virtual id

orderSchema.virtual('._id').get(function () {
    return this._id.toHexString();
});

exports.Order = mongoose.model('orders', orderSchema);
