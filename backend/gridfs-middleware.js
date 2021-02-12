const multer = require("multer");
const { storage } = require("./gridfs-service");

const upload = multer({
  storage
});

module.exports = function GridFSMiddleware() {
  return upload.single("pdfdata");
};