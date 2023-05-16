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
  module.exports=user;