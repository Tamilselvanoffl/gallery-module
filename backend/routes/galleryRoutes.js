require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

/* Enable CORS */
app.use(
  cors({
    origin: "*"
  })
);

/* Parse JSON */
app.use(express.json());

/* Serve uploaded images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* Root route to test backend */
app.get("/", (req, res) => {
  res.send("Gallery Backend Running");
});

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) =>
    console.log("MongoDB connection failed:", err.message)
  );

/* API Routes */
app.use("/api", galleryRoutes);

/* Start Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});