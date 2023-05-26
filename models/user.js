const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone:{
            type: Number,
            required: true,
        },
        address: String,
        wishlist: [{type: mongoose.Schema.type.ObjectId,
        ref: 'products'}],
        orders: [{type: mongoose.Schema.type.ObjectId,
            ref:'orders'}],
    },
    { timestamps: true }
);

const user = mongoose.model('users', userSchema);
module.exports = user;
