const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const compression = require("compression"); // for gzip compression
const app = express();

// Import Routes
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression()); // Enable compression for better performance
app.use(
  express.static("public", {
    maxAge: "1d", // Cache static files for 1 day
    etag: false, // Disable ETag for static files
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// Feedback Route
app.post("/feedback/create", async (req, res) => {
  try {
    console.log(`Feedback received from ${req.ip} at ${req.url}:`, req.body);
    res.status(200).json({ message: "Feedback received" });
  } catch (error) {
    console.error(`Error in feedback route (${req.method} ${req.url}):`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// MongoDB Connection
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "MomentStay",
    maxPoolSize: 10, // Correct option for connection pooling
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

// Optionally, you can enable more detailed logging for MongoDB queries
mongoose.set("debug", true); // Logs all MongoDB queries in the console
