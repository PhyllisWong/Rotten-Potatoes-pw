const express = require('express');
const app = express();
const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('abd49a1bba895c620b6e924e4f3a0098');

app.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then(response => {
    res.render('movies/movies-index', { movies: response.results });
  }).catch(console.error)
});

module.exports = app;