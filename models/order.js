const mongoose = require('mongoose');
const { user } = require('../models/user');

const orderSchema = mongoose.Schema({
 
    // referring to the user who ordered
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    //order is referrig to order items
    orderItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderItem",
            required: true,
        },
    ],
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
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

    phone_num: {
        type: String,
        required: true,
        ref: 'user',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
},    { timestamps: true });


// virtual id

orderSchema.virtual('id').get(function () {
    return this.order_id.toHexString();
});

exports.Order = mongoose.model('orders', orderSchema);
