const User = require('../models/user');
const mongoose=require('mongoose');

exports.updatecust = async(req, res) => {
    try {
      const customer = await User.findOne({_id: req.params.id})
      res.render('pages/updatedeletecust', {
        customer
      })
    }
    catch(error) {
      console.log(error);
    }
  }