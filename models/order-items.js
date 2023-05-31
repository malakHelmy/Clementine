const { default: mongoose } = require("mongoose");

const orderItemSchema = mongoose.Schema({
    
    //order item is referring to product
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    name: {
        type: String,
        ref: 'products'
    },

    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    quantity: {
        type:Number,
        default: 1
    },
},    { timestamps: true });


exports.OrderItem  = mongoose.model('orderitems', orderItemSchema);