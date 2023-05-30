const mongoose = require('mongoose');
const reviewsSchema = mongoose.Schema(
    { 
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, "Cannot be blank."],
            match: [/\S+@\S+\.\S+/, "Invalid input."],
            index: true,

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
        required: true},
    },
    { timestamps: true }
);

const user = mongoose.model('reviews', reviewsSchema);
module.exports = user;
