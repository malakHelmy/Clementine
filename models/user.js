
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
});

exports.User = mongoose.model('users', userSchema);

/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in other files using the 'require' method,
exporting method #1*/
