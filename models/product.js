const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
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
        images: [
            {
                type: String,
                required: true,
            },
        ],
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
        material: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },

        countInStock: {
            type: Number,
            required: true,
            min: 0,
            max: 20,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in other files using the 'require' method,
exporting method #1*/
exports.Product = mongoose.model('products', productSchema);
