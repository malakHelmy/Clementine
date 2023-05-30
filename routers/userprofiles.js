const express = require('express');
const {Order} = require('../models/order');
//const { OrderItem } = require('../models/order-items');
const router = express.Router();
const User = require('../models/user');

router.get(`/`, async (req, res) => {

  Order.find()
  .then(async (orderslist) => {          
  res.render('pages/userprofile', {
    order: orderslist
  })

  })
  .catch((err) => {
      
    console.log(err);
  });
});

function getLoggedInUserName(req) {
  const userEmail = req.session.user;
  if (!userEmail) {
    return Promise.reject('User email not found in session');
  }

  return User.findOne({ email: userEmail })
    .then((user) => {
      if (user) {
        return user.name;
      }
      return null;
    })
    .catch((error) => {
      console.log('Error retrieving user from the database:', error);
      throw new Error('Failed to retrieve user from the database');
    });
}

router.get('/userprofile', async (req, res) => {
  try {
    const loggedInUserName = await getLoggedInUserName(req);

    if (!loggedInUserName) {
      res.status(401).send('Unauthorized');
      return;
    }

    const user = await User.findOne({ email: req.session.user });

    if (user) {
      const wishlistItemCount = user.wishlist.length;

      res.render('pages/userprofile', { user: loggedInUserName, wishlistItemCount }, (err, html) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.send(html);
        }
      });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.log('Error retrieving user:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
