require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/* ===== MIDDLEWARE ===== */
app.use(express.json());

/* ===== STATIC FILES ===== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===== TEST ===== */
app.get("/", (req, res) => {
res.send("Gallery Backend Running");
});

/* ===== DATABASE ===== */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection failed:", err.message));

/* ===== ROUTES ===== */
app.use("/api", galleryRoutes);

/* ===== 404 ===== */
app.use((req, res) => {
res.status(404).json({ message: "Route not found" });
});

/* ===== SERVER ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
