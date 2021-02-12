const express = require("express");
const router = express.Router();
const path = require('path'); 
const mongoose = require("mongoose");

//const methodOverride = require("method-override");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");

const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

const DIR = "./public/";

require('dotenv').config();

// DB Config
const mongoUri = process.env.DB_URL || 'mongodb://localhost:27017/labinventory';

// setup storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//       const fileName = file.originalname.toLowerCase().split(' ').join('-');
//       cb(null, uuidv4() + '-' + fileName);
//       //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// var upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//       if (file.mimetype == "application/pdf" || file.mimetype == "image/jpeg") {
//           cb(null, true);
//       } else {
//           cb(null, false);
//           return cb(new Error('Only .pdf and .jpg format allowed!'));
//       }
//   }
// });


// create storage engine 
const storage = new GridFsStorage({
  url: mongoUri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // encrypt filename before storing it
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({
  storage
});

// pending connection to the test database running on localhost  
const conn = mongoose.connection;

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

// Load input validation
//const validateOrderInput = require("../validation/order");

// Load Stock model
const Stock = require("../models/stock.model");

// @route GET api/stock/orders/uploads
// @desc Get file by :filename
router.get("/:filename", (req, res) => {
    //console.log('req.file: ', req.file);
    //res.send(req);
    //console.log('req: ', req);
    const file = gfs
      .find({
        filename: req.params.filename 
      })
      .toArray((err, files) => {
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);  
    });
});

module.exports = router;