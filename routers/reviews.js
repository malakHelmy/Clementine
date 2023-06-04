
const express = require('express');
const  Review  = require('../models/reviews');
const { Product } = require('../models/product');
const bcrypt=require('bcrypt')
const router = express.Router();

router.post(`/`, async  (req, res) => {

  const Error={
    emailerror:String,
    summaryerror:String,
    reviewerror:String
  };
       let c=0;
       if(req.body.inputs.email==''){
           Error.emailerror=' Please enter an email';
           c++;
        }else{
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          var isValid = emailPattern.test(req.body.inputs.email);
          if(isValid){
            }else{
             Error.emailerror='Email is Invalid';
             c++;
            }
        }


       if(req.body.inputs.summary==''){
        Error.summaryerror='summary is required ';
        c++;
        }

        if(req.body.inputs.review==''){
          Error.reviewerror='review is required ';
          c++;
          }

          if(c>0){

            res.send(Error);

          }else{
            const revieww={
              email:req.body.inputs.email,
              summary:req.body.inputs.summary,
              review:req.body.inputs.review,
              productId:req.body.inputs.productId
            }
            const reviews=new Review(revieww);
              reviews.save()
              .then(async (result) => {          
                res.send('done')    
             }).catch( err => {
             console.log(err);
           });
          }
});

module.exports = router;
