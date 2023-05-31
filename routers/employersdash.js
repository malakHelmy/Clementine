
const express = require('express');
const Employer = require('../models/employer');
const bcrypt=require('bcrypt')
const router = express.Router();

router.get('/', async(req, res) =>{
    try{
        const employers = await Employer.find();
        res.render('pages/employersdash', { employers: employers});

    }
    catch(err){
        console.log(error);
    res.status(500).send('Internal Server Error');
    }
} )

router.post('/:id', async (req, res) => {
    try {
      const empid = req.params.id;
      await Employer.findByIdAndRemove(empid);
      res.redirect('/employersdash');
    } catch (error) {
      console.log('Error deleting employee:', error);
      res.redirect('/employersdash');
    }
  });
  
  module.exports = router;


