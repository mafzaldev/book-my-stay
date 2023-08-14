const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1024 * 1024 },
});
