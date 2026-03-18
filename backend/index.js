require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

/* ===== CORS ===== */
app.use(cors());
app.options("*", cors());

console.log("✅ CORS ENABLED");

/* ===== DEBUG MONGO URI ===== */
console.log("🔍 MONGO URI:", process.env.MONGO_URI);

/* ===== MIDDLEWARE ===== */
app.use(express.json());

/* ===== STATIC FILES ===== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("Gallery Backend Running");
});

/* ===== DATABASE CONNECTION ===== */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB connection failed:", err.message));

/* ===== ROUTES ===== */
app.use("/api", galleryRoutes);

/* ===== 404 HANDLER ===== */
app.use((req, res) => {
  console.log("❌ Route not found:", req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});

/* ===== SERVER ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});