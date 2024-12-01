const express = require("express");
const dotenv = require("dotenv");
const path = require('path')
const cors = require("cors")
const calendarRoutes = require("./routes/calendarRoutes");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/calendar", calendarRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});