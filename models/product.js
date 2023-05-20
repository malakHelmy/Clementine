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
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
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
      max: 10000,
    },
  },
//   { _id: false } // Disable the default _id field
);

// Set the 'id' field as the primary identifier
// productSchema.virtual('productId').get(function () {
//   return this.id;
// });

exports.Product = mongoose.model('Product', productSchema);
