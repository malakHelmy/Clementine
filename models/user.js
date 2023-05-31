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
            unique: true,
            lowercase: true,
            required: [true, "Cannot be blank."],
            match: [/\S+@\S+\.\S+/, "Invalid input."],
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone:{
            type: Number,
            required: true,
        },
        isAdmin:{
            type: Boolean,
            default : false,
        },
        address: String,
        wishlist: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'products'}],
        orders: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'orders',
            },
          ],
    },
    { timestamps: true }
);

const user = mongoose.model('users', userSchema);
module.exports = user;
