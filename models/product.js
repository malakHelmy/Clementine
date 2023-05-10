const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    //turned an element to an object
    //so that an error occurs if this element wasn't present while sending other elements of productSchema
    countInStock: {
        type: Number,
        required: true,
    },
});

/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in any other file using the 'require' method,
exporting method #1*/
exports.Product = mongoose.model('products', productSchema);