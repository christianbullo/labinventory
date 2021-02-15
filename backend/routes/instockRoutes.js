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


// @route GET api/stock/instock/lastinstock
// @desc Get last request id
router.get("/lastinstock", (req, res) => {
  Stock.find({"category": "instock"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
    .then(lastInstock => {
      if (lastInstock.length === 0) {
        console.log('attenzione lastInstock is null');
        lastInstock = [{ id: 0 }]; 
      };
      res.json(lastInstock);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route GET api/stock/instock/instock 
// @desc Get instock
router.get("/instock", (req, res) => {
  Stock.find({"category": "instock"}).sort({orderdate: 'asc'})
    .then(instock => res.json(instock))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/stock/instock/addinstock
// @desc Add in stock 
router.post("/addinstock", upload.single('imgdata'), (req, res) => {
  
  const item_id = req.body.item_id; 
  const new_id = req.body.id; 
  const category = "instock";  
  const location = req.body.location;
  const deliverydate = req.body.deliverydate;
  const deliveryuser = req.body.deliveryuser;
  const status = " ";  
  const imgname = req.file.filename; 

  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "id": new_id,
        "category": category, 
        "location": location,
        "deliverydate": deliverydate, 
        "deliveryuser": deliveryuser,
        "status": status, 
        "imgname": imgname
      } 
    }
  )
  .then(instock => {
    res.json(instock);
    //console.log('order updated: ' + order);
  })
  .catch(err => {
    console.log('Error in POST /addinstock: ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

// @route POST api/stock/instock/editstockloc
// @desc Update item in stock on location
router.post("/editlocation", upload.single('imgdata'), (req, res) => {

  const item_id = req.body.item_id; 
  const location = req.body.location; 
  const imgname = req.file.filename;
  const updatelocdate = req.body.updatelocdate;
  const updatelocuser = req.body.updatelocuser;

  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "location": location,
        "imgname": imgname,
        "updatelocdate": updatelocdate,
        "updatelocuser": updatelocuser
      } 
  })
  .then(order => {
    res.json(order);
  })
  .catch(err => {
    console.log('Error in POST /editorder: ' + err);
    res.status(400).json('Error: ' + err);
  } );

});

// @route POST api/stock/instock/editdetails
// @desc Update item in stock on location
router.post("/editdetails", (req, res) => {
  
  const entries = Object.keys(req.body)
  const updates = {}
  for (let i = 0; i < entries.length; i++) {
    if (entries[i] !== 'item_id') {
      updates[entries[i]] = Object.values(req.body)[i];
      console.log('entries[i] is ' + entries[i]);
      console.log('updates[entries[i]] is ' + updates[entries[i]]);
      }    
  }

  const item_id = req.body.item_id; 
  
  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: updates }
  )
  .then(order => {
    res.json(order);
  })
  .catch(err => {
    console.log('Error in POST /editdetails: ' + err);
    res.status(400).json('Error: ' + err);
  } );

});

module.exports = router;
  
