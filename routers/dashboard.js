const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');
const User = require('../models/user');
const Employer = require('../models/employer');

// Fetching recent orders
router.get('/', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const orders = await Order.find().sort({ createdAt: -1 }).limit(3);

    // Fetch the employer data
    console.log(req.session.employer)
    const employer = await Employer.findOne({ email: req.session.employer });

    res.render('pages/dashboard', {
      currentPage: 'dashboard',
      totalUsers: totalUsers,
      recentOrders: orders,
      employer: employer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
