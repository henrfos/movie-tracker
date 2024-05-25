const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  const query = req.query.q;
  if (query) {
    axios.get(`dummyapikey`)
      .then(response => {
        res.render('search', { movies: response.data.Search });
      })
      .catch(error => {
        console.error(error);
        res.render('search', { movies: [] });
      });
  } else {
    res.render('search', { movies: [] });
  }
});

module.exports = router;