const mongoose = require('mongoose');
const CouponSchema = mongoose.Schema({

name:{
    type: String,
    required: true,
    unique: true,
    uppercase: true,
},
expiry:{
    type: Date,
    required: true,

},
discount: {
    type: Number,
    required: true,
},

});


exports.Coupon = mongoose.model('coupon', CouponSchema);