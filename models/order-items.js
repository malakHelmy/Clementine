const { default: mongoose } = require("mongoose");

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    
    //order item is referring to product
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

exports.OrderItem  = mongoose.model('OrderItem', orderItemSchema);