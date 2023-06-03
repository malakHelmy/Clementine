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

