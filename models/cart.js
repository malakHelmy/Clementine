const mongoose = require('mongoose');
const cartSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
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
        email:String
});

/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in other files using the 'require' method,
exporting method #1*/
module.exports = mongoose.model('carts', cartSchema);
