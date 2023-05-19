
const express = require('express');
const User = require('../models/user');
const router = express.Router();

exports.updatecust = async(req, res) => {
    try {
      const customer = await User.findOne({_id: req.params._id})
      res.render('pages/updatecustdash', {
        upcust: customer
      })
    }
    catch(error) {
      console.log(error);
    }
  }
