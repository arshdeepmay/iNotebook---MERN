const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password length should be atleast 8').isLength({ min: 8 }),
    body('name', 'Enter a Valid name').isLength({ min: 3 })
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(user => res.json(user))
    .catch(err=> {console.log(err)
    res.json({error:'Please enter a unique value for email' , message : err.message})})
    
} )

module.exports = router