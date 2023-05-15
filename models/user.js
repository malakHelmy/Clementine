const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstname:String,
    lastname:String,
    email: String, 
    password: String,
    phone: String,
  });

  const user=mongoose.model("User",userSchema);
  exports.user =user;


  
/*model is the equivalent of 'collection' in node.js,
'exports' will allow Product to be seen in other files using the 'require' method,
exporting method #1*/

