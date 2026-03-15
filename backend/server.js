const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const galleryRoutes = require("./routes/galleryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* Serve uploaded images */
app.use("/uploads", express.static("uploads"));

/* MongoDB Connection 
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => {
  console.log("MongoDB connection failed");
});
*/

/* Test route */
app.get("/", (req, res) => {
 res.send("Gallery Backend Running");
});

/* Routes */
console.log("Gallery routes loaded");
app.use("/api", galleryRoutes);

/* Server Port */
const PORT = 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});