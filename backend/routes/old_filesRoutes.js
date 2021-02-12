const express = require("express");
const router = express.Router();
const wrap = require("express-async-wrapper");

const { getGridFSFiles } = require("../gridfs-service");
const { createGridFSReadStream } = require("../gridfs-service");

// @route GET api/stock/files
// @desc Get file by :filename
router.get(
  "/uploads/:id",
  wrap(async (req, res) => {
    const file = await getGridFSFiles(req.params.id);
    if (!file) {
      res.status(404).send({ message: "File not found" });
    }
    res.setHeader("content-type", file.contentType);
    const readStream = createGridFSReadStream(req.params.id);
    readStream.pipe(res);
  })
);

module.exports = router;

