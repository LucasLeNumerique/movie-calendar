const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  synopsis: { type: String, required: true },
  imagePath: { type: String, required: true }, // Path to the movie poster image
  is_showed: { type: Boolean, default: false }, // Whether this movie has been shown
  calendarDate: { type: String, default: null }, // Date (in DD-MM format) when this movie was shown
});

module.exports = mongoose.model('Movie', movieSchema);