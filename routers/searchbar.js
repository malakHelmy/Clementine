const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.post('/search', async (req, res) => {
  try {
    let searchQuery = req.body.query.trim();
    let searchResults = await Product.find({
      name: { $regex: new RegExp(searchQuery, 'i') },
    })
      .select('name _id') // Select only the name and ID fields
      .limit(10)
      .exec();
    let hint = '';
    if (searchResults.length > 0) {
      searchResults.forEach((result) => {
        hint += `<a href="${result._id}" target="_blank">${result.name}</a><br>`;
      });
    } else {
      hint = 'No results found';
    }
    res.send({ response: hint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/*
router.post('/search', async (req, res) => {
  try {
    let payload = req.body.payload.trim();
    let searchResults = await Product.find({
      name: { $regex: new RegExp('^' + payload + '.*', 'i') },
    })
      .select('name _id') // Select only the name and ID fields
      .limit(10)
      .exec();
    res.render('pages/search', {
     results: searchResults });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/
module.exports = router;