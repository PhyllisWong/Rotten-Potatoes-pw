const express = require('express')
const app = express()
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

// INDEX: Show all reviews


// CREATE: Show the review template
app.get('/movies/:movieId/reviews/reviews-new', (req, res) => {
  Review.find({
    movieId: req.params.movieId
  }).then((movie) => {
    console.log(movie);
    res.render('reviews/reviews-new', {
      movie,
      movieId: req.params.movieId
    });
  })
});


//CREATE
app.post('/movies/:movieId/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    res.redirect(`reviews/${review.id}`);
  }).catch((err) => {
    console.log(err.message);
  })
});


// SHOW: Show one review
app.get('/movies/:movieId/reviews/:id', (req, res) => {
  Review.findById(req.params.id)
    .then(review => {
      Comment.find({
          reviewId: req.params.id
        })
        .then(comments => {
          console.log(comments);
          // Respond with the template with both values
          res.render('reviews/review-show', {
            review: review,
            comments: comments
          })
        })

    }).catch((err) => {
      console.log(`Error: ${err.message}`);
    })
});


// Edit
app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    res.render('reviews/reviews-edit', {
      review: review
    });
  })
});

// Update
app.post('/movies/:movieId/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/movies/${review.movieId}`);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`)
    })
});

// Delete
app.delete('/reviews/:id', (req, res) => {
  console.log('DELETE review');
  Review.findByIdAndRemove(req.params.id, req.body)
    .then(review => {
      res.redirect(`/movies/${review.movieId}`);
    }).catch((err) => {
      console.log(`Error: ${err.message}`);
    })
});

module.exports = app;