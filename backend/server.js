require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

/* CORS MUST BE HERE */
app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log("MongoDB connection failed:", err.message));

console.log("Gallery routes loaded");
app.use("/api", galleryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
 console.log(`Server running on port ${PORT}`);
});