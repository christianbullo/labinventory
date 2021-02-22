const mongoose = require("mongoose");
require('dotenv').config();
// DB Config
//const mongoUri = process.env.DB_URL || 'mongodb://localhost:27017/labinventory';
const dbPath = process.env.DB_URL || 'mongodb://localhost:27017/labinventory';

const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

const conn = mongoose.createConnection(dbPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

conn.on("error", () => {
  console.log("Error occurred from the database");
});

let gfs, gridFSBucket;

conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
  // Init stream
  gfs = Grid(conn.db);
  gfs.collection("uploads");
  console.log("[!] The database connection opened successfully in GridFS service");
});

const getGridFSFiles = id => {
  return new Promise((resolve, reject) => {
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, files) => {
      if (err) reject(err);
      // Check if files
      if (!files || files.length === 0) {
        resolve(null);
      } else {
        resolve(files);
      }
    });
  });
};

const createGridFSReadStream = id => {
  return gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id));
};

const storage = new GridFsStorage({
  url: dbPath,
  cache: true,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise(resolve => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: "uploads"
      };
      resolve(fileInfo);
    });
  }
});

storage.on("connection", () => {
  console.log("[!] Successfully accessed the GridFS database");
});

storage.on("connectionFailed", err => {
  console.log(err.message);
});

module.exports = mongoose;
module.exports.storage = storage;
module.exports.getGridFSFiles = getGridFSFiles;
module.exports.createGridFSReadStream = createGridFSReadStream;