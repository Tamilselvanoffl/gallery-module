require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

/* ================= CORS FIX ================= */
app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

if (req.method === "OPTIONS") {
return res.sendStatus(200);
}

next();
});


/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= STATIC ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
res.send("Gallery Backend Running");
});

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection failed:", err.message));

/* ================= ROUTES ================= */
app.use("/api", galleryRoutes);

/* ================= 404 ================= */
app.use((req, res) => {
res.status(404).json({ message: "Route not found" });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
