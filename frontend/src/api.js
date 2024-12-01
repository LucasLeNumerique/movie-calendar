import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
});

export default {
  getMovieOfTheDay() {
    return api.get("/calendar/movie-of-the-day");
  },
};