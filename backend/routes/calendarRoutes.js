const express = require("express");
const { getMovieOfTheDay, resetMoviesForNewMonth } = require("../controllers/calendarController");

const router = express.Router();

// Get the movie of the day
router.get("/movie-of-the-day", getMovieOfTheDay);

// Reset movies for the new month
router.post("/reset", resetMoviesForNewMonth);

module.exports = router;