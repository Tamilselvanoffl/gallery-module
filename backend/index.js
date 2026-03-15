require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* serve uploaded images */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* connect mongodb */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* test route */
app.get("/", (req,res)=>{
  res.send("Gallery Backend Running");
});

/* api routes */
app.use("/api", galleryRoutes);

/* dynamic port for deployment */
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});