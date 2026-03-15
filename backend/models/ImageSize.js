const mongoose = require("mongoose");

const imageSizeSchema = new mongoose.Schema({
  width: Number,
  height: Number
});

module.exports = mongoose.model("ImageSize", imageSizeSchema);