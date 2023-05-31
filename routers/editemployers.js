const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');

router.get('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return res.status(404).json({ error: 'Employer not found' });
    }
    res.render('editemployers', { employer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
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



router.delete('/:id', async (req, res) => {
    try {
      const employer = await Employer.findByIdAndDelete(req.params.id);
      if (!employer) {
        return res.status(404).json({ error: 'Employer not found' });
      }
      res.redirect('/employersdash');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = router;
  

module.exports = router;
