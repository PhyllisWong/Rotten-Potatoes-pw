const express = require('express');
const app = express();
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');



// ***************  ROUTES  **************** //


// CREATE Comment
app.post('/reviews/comments', (req, res) => {
  Comment.create(req.body)
    .then(comment => {
      res.status(200).send({ comment: comment });
    })
    .catch((err) => {
      res.status(400).send({ err: err });
    })
});

// DELETE Comment
app.delete('/reviews/comments/:_id', (req, res) => {

  console.log("Delete comment")
  Comment.findByIdAndRemove(req.params._id)
    .then((comment) => {
      res.status(200).send(comment);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send(err)
    })
});


module.exports = app;