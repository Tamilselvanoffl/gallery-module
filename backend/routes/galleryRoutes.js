const express = require("express");
const router = express.Router();
const path = require("path");

const upload = require("../middleware/upload");
const { uploadImage } = require("../controllers/galleryController");

const Image = require("../models/Image");

/* Upload */

router.post("/upload", upload.single("image"), uploadImage);

/* Get Images */

router.get("/images", async (req, res) => {

 try {

   const images = await Image.find().sort({ createdAt: -1 });

   res.json(images);

 } catch (err) {

   res.status(500).json({
     error: err.message
   });

 }

});

/* Download */

router.get("/download", (req, res) => {

 const filePath = req.query.path;

 if (!filePath) {
  return res.status(400).json({ message: "File path required" });
 }

 const fullPath = path.join(__dirname, "..", filePath);

 res.download(fullPath);

});

module.exports = router;