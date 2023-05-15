const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order_id: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    orderitems: [{

        type: mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required: true,

    }],
    shippingAddress1:{
        type: String,
        required: true
    },
    shippingAddress2:{
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    
    phone_num: {
        type: Number,
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
        required: true
    },
});

/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in other files using the 'require' method,
exporting method #1*/
exports.Order = mongoose.model('orders', orderSchema);
