const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');
const User = require('../models/user');
const Employer = require('../models/employer');

// Fetching recent orders
router.get('/', async (req, res) => {
  try {

    if(req.session.employer != undefined){
      const totalUsers = await User.countDocuments();
      const orders = await Order.find().sort({ createdAt: -1 }).limit(3);
  
      // Fetch the employer data
     
      const employer = await Employer.findOne({ email: req.session.employer });
  
  
      // req.session.employer=empresult.email;
      // req.session.admin=empresult.isAdmin;
      if(req.session.admin == true){
  
         res.render('pages/dashboard', {
        currentPage: 'dashboard',
        totalUsers: totalUsers,
        recentOrders: orders,
        employer: employer,
        isadmin:true
      });
      }else{
  
        res.render('pages/dashboard', {
          currentPage: 'dashboard',
          totalUsers: totalUsers,
          recentOrders: orders,
          employer: employer,
          isadmin:false
        });
      }
    }else{
      res.render('pages/404')
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
