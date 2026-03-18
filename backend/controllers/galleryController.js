const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ImageSize = require("../models/ImageSize");
const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  try {
    console.log("🔥 Upload API HIT");
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const originalPath = req.file.path;

    // ✅ ensure file exists
    if (!fs.existsSync(originalPath)) {
      return res.status(400).json({
        message: "Uploaded file not found on server"
      });
    }

    const resizedDir = "uploads/resized";

    // ✅ create folder if not exists
    if (!fs.existsSync(resizedDir)) {
      fs.mkdirSync(resizedDir, { recursive: true });
    }

    let sizes = await ImageSize.find();

    // ✅ fallback if DB empty
    if (!sizes || sizes.length === 0) {
      sizes = [
        { width: 200, height: 200 },
        { width: 400, height: 400 }
      ];
    }

    // ✅ PARALLEL PROCESSING (FAST)
    const resizedImages = await Promise.all(
      sizes.map(async (size) => {
        const resizedPath =
          `${resizedDir}/${size.width}x${size.height}-${req.file.filename}`;

        await sharp(originalPath)
          .resize(size.width, size.height)
          .toFile(resizedPath);

        return {
          width: size.width,
          height: size.height,
          path: `/${resizedPath}`
        };
      })
    );

    // ❌ REMOVE THIS (was slowing everything)
    // await Image.deleteMany({});

    const image = new Image({
      original: `/${originalPath}`,
      sizes: resizedImages
    });

    await image.save();

    res.json({
      message: "Image uploaded successfully",
      image
    });

  } catch (error) {
    console.log("❌ UPLOAD ERROR:", error);

    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
};