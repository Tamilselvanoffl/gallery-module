const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Serve uploaded images */
app.use("/uploads", express.static("uploads"));

/* MongoDB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/galleryDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* Test route */
app.get("/", (req, res) => {
 res.send("Gallery Backend Running");
});

/* Routes */
console.log("Upload routes loaded");
app.use("/api", uploadRoutes);

/* Server Port */
const PORT = 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});