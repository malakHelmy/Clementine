const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order_id: {
        type: String,
        required: true,
    },
    // referring to the user who ordered
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    userName: {
        type: String,
        required: true,
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
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
});

// virtual id

orderSchema.virtual('id').get(function () {
    return this.order_id.toHexString();
});

exports.Order = mongoose.model('orders', orderSchema);
