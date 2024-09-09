const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API;

router.get('/', async (req, res) => {
  const query = req.query.searchQuery;
  if (query) {
    try {
      const searchResponse = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      
      // Check if response is valid
      if (searchResponse.data.Response === 'False') {
        throw new Error(searchResponse.data.Error);
      }
      
      let movies = searchResponse.data.Search || [];
      
      res.render('search', { movies, searchQuery: query });
    } catch (error) {
      console.error(`Error fetching data from OMDb: ${error.message}`, error.response?.status);
      res.render('search', { movies: [], searchQuery: query, error: 'Error fetching movies. Please try again later.' });
    }
  } else {
    res.render('search', { movies: [], searchQuery: '' });
  }
});

module.exports = router;

module.exports = router;