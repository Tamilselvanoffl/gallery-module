const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const upload = require("../middleware/upload");
const { uploadImage } = require("../controllers/galleryController");
const Image = require("../models/Image");

/* ===== Upload ===== */
router.post("/upload", upload.single("image"), uploadImage);

/* ===== Get images ===== */
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.log("❌ FETCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ===== Download ===== */
router.get("/download", (req, res) => {
  try {
    let filePath = req.query.path;

    // ✅ decode URL (VERY IMPORTANT)
    filePath = decodeURIComponent(filePath);

    const fullPath = path.join(__dirname, "..", filePath);

    console.log("📥 Downloading:", fullPath);

    // ✅ check file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ message: "File not found" });
    }

    res.download(fullPath);

  } catch (err) {
    console.log("❌ DOWNLOAD ERROR:", err);
    res.status(500).json({ message: "Download failed" });
  }
});

module.exports = router;