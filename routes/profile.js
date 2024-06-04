const express = require('express');
const router = express.Router();
const db = require('../models');
const { ensureAuthenticated } = require('../config/auth'); // Importing ensureAuthenticated

// Profile page
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const userMovies = await db.UserMovie.findAll({ where: { userId: req.user.id } });
    res.render('profile', { user: req.user, userMovies });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Add a movie to the profile
router.post('/add', ensureAuthenticated, async (req, res) => {
  try {
    const { movieId, title, year, genre, director, actors, imdbRating, poster } = req.body;
    await db.UserMovie.create({
      userId: req.user.id,
      movieId,
      title,
      year,
      genre,
      director,
      actors,
      imdbRating,
      poster
    });
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.redirect('/search');
  }
});

// Rate and review a movie
router.post('/rate', ensureAuthenticated, async (req, res) => {
  try {
    const { id, userRating, review } = req.body;
    const userMovie = await db.UserMovie.findOne({ where: { id, userId: req.user.id } });
    if (userMovie) {
      userMovie.userRating = userRating;
      userMovie.review = review;
      await userMovie.save();
    }
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.redirect('/profile');
  }
});

module.exports = router;