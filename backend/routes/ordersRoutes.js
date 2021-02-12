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
//const { Buffer } = require("buffer");

// @route GET api/stock/lastorder
// @desc Get last request id
router.get("/lastorder", (req, res) => {
  Stock.find({"category": "order"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
    .then(lastOrder => {
      res.json(lastOrder);
        //console.log("lastOrder is " + lastOrder);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route GET api/stock/orders
// @desc Get requests
router.get("/orders", (req, res) => {
  Stock.find({"category": "order"}).sort({orderdate: 'asc'})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/stock/addorder
// @desc Add request
router.post("/addorder", upload.single('pdfdata'), (req, res) => {

  // Form validation
  //const { errors, isValid } = validateOrderInput(req.body);

  // Check validation
  // if (req.file == undefined) {
  //     return res.status(400).json('Error: no file selected!');
  // }
  
  //const url = req.protocol + '://' + req.get('host');

  const item_id = req.body.item_id; 
  const new_id = req.body.id; 
  const category = "order";
  const tracking = req.body.tracking;
  const orderdate = req.body.orderdate;
  const orderuser = req.body.orderuser;
  const pdfname = req.file.filename;

  // test 
  const pdfdata = " ";

  //const pdfdata = url + '/public/' + req.file.filename; //req.file.path;
  //const filepdf = fs.readFileSync(req.file.path); 
  //const encode_filepdf = filepdf.toString('base64');
  //const pdfdata = new Buffer(encode_filepdf, 'base64');

  console.log('req.body.item_id', req.body.item_id);
  console.log('req.body.item_id', req.body.id);
  console.log('req.body.tracking', req.body.tracking);  
  console.log('req.body.orderdate', req.body.orderdate); 
  console.log('req.body.orderuser', req.body.orderuser);
  console.log('req.body.pdfname (req.file.filename)', req.body.pdfname);
  // console.log('req.file.filename', req.file.filename);
  // console.log('req.file.path', req.file.path);
  console.log('req.file: ', req.file);
  //console.log('pdfdata', pdfdata);

  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "id": new_id,
        "category": category, 
        "tracking": tracking,
        "orderdate": orderdate,
        "orderuser": orderuser,
        "pdfname": pdfname,
        "pdfdata": pdfdata
      } 
    })
  .then(order => {
    res.json(order);
    console.log('order updated: ' + order);
  })
  .catch(err => {
    console.log('Error in POST /addorder: ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

// @route GET api/stock/orders/uploads
// @desc Get file by :filename
router.get("/uploads/:filename", (req, res) => {
  const file = gfs
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);  
    });
    console.log('type of file = ', (typeof file));
    var gfs = Grid(db, mongo);         
    var rstream = gfs.createReadStream(filename);
    var bufs = [];
    rstream.on('data', function (chunk) {
        bufs.push(chunk);
    }).on('error', function () {
        res.send();
    })
    .on('end', function () { // done

                var fbuf = Buffer.concat(bufs);

                var File = (fbuf.toString('base64'));

                res.send(File);

 });
});

module.exports = router;
  
