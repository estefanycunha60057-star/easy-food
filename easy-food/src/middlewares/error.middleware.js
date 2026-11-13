const multer = require("multer");

function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        error: "O arquivo excede o limite máximo de 5 MB"
      });
    }
    return res.status(400).json({
      error: `Erro no upload: ${err.message}`
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : "Erro interno do servidor";

  return res.status(statusCode).json({
    error: message
  });
}

module.exports = errorHandler;
