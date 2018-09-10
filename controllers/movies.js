const express = require('express');
const app = express.Router();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');
const MovieDb = require('moviedb-promise');
// const moviedb = new MovieDb(process.env.SECRET_KEY);
const SECRET_KEY = 'abd49a1bba895c620b6e924e4f3a0098';
const moviedb = new MovieDb(SECRET_KEY);


// Show all trending movies
app.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies()
    .then(response => {
    res.render('movies/movies-index', { movies: response.results });
  }).catch(console.error)
});

// SHOW one movie
app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id })
    .then(movie => {
      if (movie.video) {
        moviedb.movieVideos({ id: req.params.id }).then(videos => {
          movie.trailer_youtube_id = videos.results[0].SECRET_KEY;
          renderTemplate(movie)
        })
      } else {
        renderTemplate(movie)
      }

      function renderTemplate(movie) {
        Review.find({movieId: req.params.id})
          .then(reviews => {
            console.log(`Reviews list: [${reviews}]`);
            res.render("movies/movies-show", { movie: movie, reviews: reviews });
          })
      }
    }).catch(console.error);
});





module.exports = app;