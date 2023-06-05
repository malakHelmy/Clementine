const express = require('express');
const router = express.Router();
const Review = require('../models/reviews');

// router.get('/', async (req, res) => {
//   try {
//     const reviews = await Review.find().populate('productId');
//     const reviewData = reviews.map(review => ({
//       productName: review.productId.name
//     }));

//     res.render('pages/reports', { reviews, productName }); 
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('productId');
    const reviewData = reviews.map(review => ({
      email: review.email,
      summary: review.summary,
      review: review.review,
      productName: review.productId.name
    }));
    res.render('pages/reports', { reviews: reviewData }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
