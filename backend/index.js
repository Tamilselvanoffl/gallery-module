require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

/* Middleware */
app.use(cors({ origin: "*" }));
app.use(express.json());

/* Static folder for uploaded images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* Root Test */
app.get("/", (req, res) => {
res.send("Gallery Backend Running");
});

/* MongoDB */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection failed:", err.message));

/* Routes */
app.use("/api", galleryRoutes);

/* 404 handler */
app.use((req,res)=>{
res.status(404).json({message:"Route not found"});
});

/* Start server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`);
});
