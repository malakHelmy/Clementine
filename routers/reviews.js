
const express = require('express');
const  Review  = require('../models/reviews');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post(`/:id`, async  (req, res) => {

        const revieww={
          email:req.body.email,
          summary:req.body.summary,
          review:req.body.review,
          productId:req.params.id.trim()
        }
        const reviews=new Review(revieww);
        reviews.save()
            .then( (result) => {          
                
            
       }).catch( err => {
        console.log(err);
      });
});

module.exports = router;
