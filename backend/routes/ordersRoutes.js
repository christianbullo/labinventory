const express = require("express");
const router = express.Router();
const path = require('path'); 
const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const multer = require("multer");

require('dotenv').config();

// Load Stock model
const Stock = require("../models/stock.model");

// DB Config
const mongoUri = process.env.DB_URL || 'mongodb://localhost:27017/labinventory';

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

  const item_id = req.body.item_id; 
  const new_id = req.body.id; 
  const category = "order";
  const tracking = req.body.tracking;
  const orderdate = req.body.orderdate;
  const orderuser = req.body.orderuser;
  const pdfname = req.file.filename;

  // console.log('req.body.item_id', req.body.item_id);
  // console.log('req.body.item_id', req.body.id);
  // console.log('req.body.tracking', req.body.tracking);  
  // console.log('req.body.orderdate', req.body.orderdate); 
  // console.log('req.body.orderuser', req.body.orderuser);
  //console.log('req.body.pdfdata (req.file.filename)', req.body.pdfdata);
  
  console.log('req.file: ', req.file);

  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "id": new_id,
        "category": category, 
        "tracking": tracking,
        "orderdate": orderdate,
        "orderuser": orderuser,
        "pdfname": pdfname 
      } 
    })
  .then(order => {
    res.json(order);
  })
  .catch(err => {
    console.log('Error in POST /addorder: ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

// @route POST api/stock/editorder
// @desc Add request
router.post("/editorder", (req, res) => {

  console.log('req.body is ' + req.body);
  res.send('ciao!');
  // const item_id = req.body.item_id; 
  // console.log('item_id = ', item_id);
  // const status = req.body.status;
  // console.log('status = ', status);

  // Stock.findByIdAndUpdate(
  //   { "_id": item_id }, 
  //   { $set: 
  //     { 
  //       "status": status 
  //     } 
  // })
  // .then(order => {
  //   res.json(order);
  // })
  // .catch(err => {
  //   console.log('Error in POST /editorder: ' + err);
  //   res.status(400).json('Error: ' + err);
  // } );

});

module.exports = router;
  
