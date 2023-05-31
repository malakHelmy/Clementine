const express = require('express');
const router = express.Router();
const { Order } = require('../models/order');

// Fetching recent orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(3);
    res.render('pages/dashboard', { currentPage: 'dashboard', recentOrders: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
