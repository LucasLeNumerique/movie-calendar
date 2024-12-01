const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const Movie = require("../models/Movie");

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Load movies from JSON file
const loadMovies = async () => {
  try {
    const movies = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/movies.json"), "utf-8"));

    for (const movie of movies) {
      const existingMovie = await Movie.findOne({ name: movie.name });
      if (!existingMovie) {
        await Movie.create({ ...movie, is_showed: false, calendarDate: null });
        console.log(`Added movie: ${movie.name}`);
      } else {
        console.log(`Movie already exists: ${movie.name}`);
      }
    }

    console.log("Movie loading completed!");
    process.exit();
  } catch (error) {
    console.error("Error loading movies:", error);
    process.exit(1);
  }
};

// Run the script
(async () => {
  await connectDB();
  await loadMovies();
})();