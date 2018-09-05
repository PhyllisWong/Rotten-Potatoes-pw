const express = require('express');
const app = express();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');
// import comments from '../models/comments.js';



// ***************  ROUTES  **************** //


// CREATE Comment
app.post('/reviews/comments', (req, res) => {
  res.render('reviews comment');
  console.log("This is totally working")
  Comment.create(req.body)
    .then(comment => {
      console.log(req.body);
      res.redirect(`/reviews/${comment.reviewId}`);
    })
    .catch(err => {
      console.log(err.message);
    })
});

module.exports = app;