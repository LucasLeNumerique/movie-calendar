const Movie = require("../models/Movie");
const moment = require("moment");

// Get or roll the movie of the day
const getMovieOfTheDay = async (req, res) => {
    try {
        const todayDate = moment().format("DD-MM");

        // Step 1: Check if today's movie exists
        let todayMovie = await Movie.findOne({ calendarDate: todayDate });
        if (todayMovie) {
            return res.json(todayMovie);
        }

        // Step 2: Select a random unshown movie
        const availableMovies = await Movie.find({ is_showed: false });
        if (availableMovies.length === 0) {
            return res.status(404).json({ message: "No movies available to roll." });
        }

        const randomIndex = Math.floor(Math.random() * availableMovies.length);
        todayMovie = availableMovies[randomIndex];

        // Step 3: Mark the selected movie as shown
        todayMovie.is_showed = true;
        todayMovie.calendarDate = todayDate;
        await todayMovie.save();

        return res.json(todayMovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Reset movies for the next month
const resetMoviesForNewMonth = async (req, res) => {
    try {
        await Movie.updateMany({}, { $set: { is_showed: false, calendarDate: null } });
        res.json({ message: "Movies have been reset for the new month." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getMovieOfTheDay, resetMoviesForNewMonth };
