const express = require('express');
const app = express();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');



// ***************  ROUTES  **************** //


// CREATE Comment
app.post('/review/comments', (req, res) => {
  Comment.create(req.body)
    .then(comment => {
      console.log(comment)
      console.log(req.body);
      res.redirect(`/reviews/${comment.reviewId}`);
    })
    .catch((err) => {
      console.log(err.message);
    })
});

module.exports = app;