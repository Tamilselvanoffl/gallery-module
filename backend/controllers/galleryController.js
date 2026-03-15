const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ImageSize = require("../models/ImageSize");
const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {

 try {

  if (!req.file) {
   return res.status(400).json({ message: "No file uploaded" });
  }

  const originalPath = req.file.path;

  const resizedDir = "uploads/resized";

  if (!fs.existsSync(resizedDir)) {
   fs.mkdirSync(resizedDir, { recursive: true });
  }

  const sizes = await ImageSize.find();

  if (sizes.length === 0) {
   return res.status(400).json({
    message: "No resize sizes found in ImageSize collection"
   });
  }

  let resizedImages = [];

  for (const size of sizes) {

   const resizedPath =
    `${resizedDir}/${size.width}x${size.height}-${req.file.filename}`;

   await sharp(originalPath)
    .resize(size.width, size.height)
    .toFile(resizedPath);

   resizedImages.push({
    width: size.width,
    height: size.height,
    path: `/${resizedPath}`
   });

  }

  /* delete previous images */
  await Image.deleteMany({});

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

  console.log("UPLOAD ERROR:", error);

  res.status(500).json({
   message: "Upload failed",
   error: error.message
  });

 }

};