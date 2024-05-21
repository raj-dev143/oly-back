const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const authRoutes = require("./routes/auth.routes");
const couponRoutes = require("./routes/coupon.routes");
const restaurantRoutes = require("./routes/restaurant.routes");

app.use("/api/auth", authRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/restaurant", restaurantRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
