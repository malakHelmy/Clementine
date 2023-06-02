const User = require('../models/user');
const mongoose=require('mongoose');

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.updatecust = async(req, res) => {
    try {
      const customer = await User.findOne({id: req.params.id})
      res.render('pages/updatedeletecust', {
        customer
      })
    }
    catch(error) {
      console.log(error);
    }
  }


exports.changePassword = async (req, res) => {
  console.log('Change password');
  try {
    const userId = req.session.id;
    console.log("found the id")
    const salt = await bcrypt.genSalt(10);
    const oldpassword = req.session.password;
    const oldbodyPass = await bcrypt.hash(req.body.oldPassword, salt);
    const newPassword = await bcrypt.hash(req.body.newPassword, salt);
    const confpassword = await bcrypt.hash(req.body.confirmPassword, salt);
    if(oldpassword===oldbodyPass){
       
    if(newPassword === confpassword){
      console.log("checked the passwords and they match")
    const userPassword = await User.findByIdAndUpdate({ _id: userId }, { password: newPassword }, { new: true });
    return res.status(200).json({ status: true, data: userPassword });
    }
  }
 }
  catch (error) {
    return res.status(400).json({ status: false, error: "Error Occurred" });
  }
} 
