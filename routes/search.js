const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = '6a0af1fd';

router.get('/', async (req, res) => {
  const query = req.query.searchQuery;
  if (query) {
    try {
      const searchResponse = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      let movies = searchResponse.data.Search || [];
      
      // Fetch detailed information for each movie
      movies = await Promise.all(movies.map(async (movie) => {
        const detailsResponse = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
        return detailsResponse.data;
      }));
      
      res.render('search', { movies, searchQuery: query });
    } catch (error) {
      console.error(error);
      res.render('search', { movies: [], searchQuery: query });
    }
  } else {
    res.render('search', { movies: [], searchQuery: '' });
  }
});

module.exports = router;