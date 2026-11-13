const sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");

async function processAndSaveImage(buffer, folder = "general", width = 800) {
  const filename = `${crypto.randomUUID()}.webp`;
  const targetDir = path.resolve(process.cwd(), "uploads", folder);

  await fs.mkdir(targetDir, { recursive: true });

  const filePath = path.join(targetDir, filename);

  try {
    await sharp(buffer)
      .rotate()
      .resize({
        width,
        withoutEnlargement: true
      })
      .webp({
        quality: 80
      })
      .toFile(filePath);
  } catch (err) {
    const error = new Error("Arquivo de imagem corrompido ou inválido");
    error.statusCode = 400;
    throw error;
  }

  return `/uploads/${folder}/${filename}`;
}

module.exports = {
  processAndSaveImage
};
