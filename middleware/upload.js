const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, '../uploads/');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure where to store the uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);  // Absolute path for the uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Save the file with a unique name
  }
});

// Initialize multer with storage options, file size limit, and file type filter
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB file size limit
  fileFilter: function (req, file, cb) {
    // Allowed file extensions
    const filetypes = /pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|odt|ods|odp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only document file formats such as .pdf, .doc, .xls, .ppt, etc. are allowed!'));
    }
  }
});

module.exports = upload;  // Export the upload middleware
