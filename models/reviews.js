const mongoose = require('mongoose');
const reviewsSchema = mongoose.Schema(
    { 
        email: {
            type: String,
            required:true,
      
        },
        summary: {
            type: String,
            required: true,
        },
        review:{
            type: String,
            required: true,
        },
        productId:{ 
        type: String,
        ref: 'products',
        required: true},
    },
    { timestamps: true }
);

const user = mongoose.model('reviews', reviewsSchema);
module.exports = user;
