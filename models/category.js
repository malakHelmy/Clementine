
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
},
    { timestamps: true });

exports.Category = mongoose.model('categories', categorySchema);

