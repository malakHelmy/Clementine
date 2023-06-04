const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.render('pages/reports', { reviews }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
