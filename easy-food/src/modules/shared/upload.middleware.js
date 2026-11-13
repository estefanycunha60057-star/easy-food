const multer = require("multer");

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: (req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      const error = new Error("Formato inválido. Utilize JPEG, PNG ou WebP");
      error.statusCode = 400;
      return callback(error);
    }
    callback(null, true);
  }
});

module.exports = upload;
