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
    userName:{
        type: String,
        required: true,
    },
    //order is referrig to order items
    orderitems: [{

        type: mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required: true,

    }],
    shippingAddress1:{
        type: String,
        required: true,
    },
    shippingAddress2:{
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
        type: Number,
        required: true,
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

// virtual id

orderSchema.virtual('id').get(function () {
    return this.order_id.toHexString();
});

/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in other files using the 'require' method,
exporting method #1*/
exports.Order = mongoose.model('orders', orderSchema);
