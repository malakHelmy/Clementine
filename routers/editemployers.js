const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');

router.get('/:id', async (req, res) => {
  try {

    if(req.session.admin ==true){
      const employer = await Employer.findById(req.params.id);
      if (!employer) {
        return res.status(404).json({ error: 'Employer not found' });
      }
      res.render('pages/editemployers', { employer,isadmin:true });
      
    }else{
      res.render('pages/404');
    }
  

  } catch (err) {
    console.error(err);
    res.status(404).render('pages/404' );
  }
});

router.post('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' });
    }

    employer.name = req.body.name;
    employer.email = req.body.email;
    employer.password = req.body.password;
    employer.phone = req.body.phone;
    employer.isAdmin = req.body.isAdmin === 'on';

    await employer.save();
    res.redirect('/employersdash'); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});




module.exports = router;
