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

    if (!fs.existsSync(originalPath)) {
      return res.status(400).json({
        message: "Uploaded file not found on server"
      });
    }

    const resizedDir = "uploads/resized";

    if (!fs.existsSync(resizedDir)) {
      fs.mkdirSync(resizedDir, { recursive: true });
    }

    // 🔥 GET SIZES
    let sizes = await ImageSize.find();

    if (!sizes || sizes.length === 0) {
      sizes = [{ width: 300, height: 200 }];
    }

    // 🔥 DELETE OLD IMAGES (FILES + DB)
    const oldImages = await Image.find();

    for (const img of oldImages) {

      // delete original file
      if (img.original) {
        const originalFile = img.original.replace("/", "");
        if (fs.existsSync(originalFile)) {
          fs.unlinkSync(originalFile);
        }
      }

      // delete resized files
      if (img.sizes) {
        img.sizes.forEach(size => {
          const filePath = size.path.replace("/", "");
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
    }

    // delete DB records
    await Image.deleteMany({});

    // 🔥 PROCESS IMAGE (FAST PARALLEL)
    const resizedImages = await Promise.all(
      sizes.map(async (size) => {
        const resizedPath =
          `${resizedDir}/${size.width}x${size.height}-${req.file.filename}`;

        await sharp(originalPath)
          .resize(size.width, size.height)
          .jpeg({ quality: 70 })
          .toFile(resizedPath);

        return {
          width: size.width,
          height: size.height,
          path: `/${resizedPath}`
        };
      })
    );

    // 🔥 SAVE NEW IMAGE
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