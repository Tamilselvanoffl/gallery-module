require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://gallery-module-backend.onrender.com"],
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log("MongoDB connection failed:", err.message));

app.use("/api", galleryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
 console.log(`Server running on port ${PORT}`);
});