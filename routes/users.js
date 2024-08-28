var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcrypt');
var db = require('../models');

// Register new user
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      email,
      username,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

// Logout user
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;