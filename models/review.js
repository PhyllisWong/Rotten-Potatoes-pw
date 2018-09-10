const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  title: String,
  description: String,
  movieTitle: String,
  rating: Number,
  movieId: {type: String, required: false}
});

module.exports = mongoose.model('Review', ReviewSchema);

