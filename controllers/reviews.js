const express = require('express');
const app = express();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

// INDEX: Show all reviews
// app.get('/movies/:movieId/reviews/new', (req, res) => {
//   res.render('reviews/reviews-new', { movieId: req.params.movieId });
// });

// CREATE
app.get('/movies/:movieId/reviews/reviews-new', (req, res) => {
  Review.find({movieId: req.params.movieId}).then((movie) => {
    console.log(movie)
    res.render('reviews/reviews-new', { movie, movieId: req.params.movieId});
  })
});


//CREATE
app.post('/movies/:movieId/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    //console.log(review);
    //redirect after review is saved
    res.redirect(`reviews/${review._id}`);
  }).catch((err) => {
    console.log(err.message);
  })
});


// SHOW: Show one review
app.get('/movies/:movieId/reviews/:id', (req, res) => {
  Review.findById(req.params._id)
    .then(review => {
      console.log('BEER');
      console.log(review);
      Comment.find({ reviewId: req.params.id })
        .then(comments => {
          console.log(comments);
          // Respond with the template with both values
          res.render('reviews/reviews-show', { review: review, comments: comments})
        })

  }).catch((err) => {
    console.log(`Error: ${err.message}`);
  })
});


// Edit
app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    res.render('reviews/reviews-edit', {review: review});
  })
});

// Update
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then((review) => {
      res.redirect(`/reviews/${review._id}`);
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`)
    })
});

// Delete
app.delete('/reviews/:id', (req, res) => {
  console.log('DELETE review');
  Review.findByIdAndRemove(req.params.id)
    .then((review) => {
      res.redirect('/');
    }).catch((err) => {
    console.log(`Error: ${err.message}`);
  })
});

module.exports = app;