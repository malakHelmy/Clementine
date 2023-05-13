const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    orderitems: {
        type: Array,
        required: true,
    },
    shippingAddress1:{
        type: String,
    },
    shippingAddress2:{
        type: String,
    },
    city: {
        type: String,
    },
    zip: {
        type: String,
    },
    status: {
        type: String,
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    userID: {
        type: String,
    },
    phone: {
        type: Number,
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
});

/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in other files using the 'require' method,
exporting method #1*/
exports.Order = mongoose.model('orders', orderSchema);
