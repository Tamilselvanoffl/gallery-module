const multer = require("multer");
const fs = require("fs");

/* Ensure upload folder exists */

const uploadDir = "uploads/original";

if (!fs.existsSync(uploadDir)) {
 fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({

 destination: (req, file, cb) => {
  cb(null, uploadDir);
 },

 filename: (req, file, cb) => {
  cb(null, Date.now() + "-" + file.originalname);
 }

});

/* Allow only images */

const fileFilter = (req, file, cb) => {

 if (file.mimetype.startsWith("image")) {
  cb(null, true);
 } else {
  cb(new Error("Only image files allowed"), false);
 }

};

const upload = multer({
 storage,
 fileFilter
});

module.exports = upload;