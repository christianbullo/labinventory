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
router.get("/lastorder", async (req, res) => {
  try {
    let lastOrder = Stock.find({"category": "order"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1);
    if (!lastOrder.length) {
      lastOrder = [{ id: 0 }]; 
    };
    res.status(200).json(lastOrder);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});
// router.get("/lastorder", (req, res) => {
//   Stock.find({"category": "order"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
//     .then(lastOrder => {
//       if (lastOrder.length === 0) {
//         //console.log('attenzione lastOrder is null');
//         lastOrder = [{ id: 0 }]; 
//       };
//       res.json(lastOrder);
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// @route GET api/stock/orders
// @desc Get requests
router.get("/orders", async (req, res) => {
  try {
    //const orders = await Stock.find({"category": "order"}).sort({orderdate: 'asc'});  
    let query = Stock.find({"category": "order"}).sort({id: 'asc'});

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = await Stock.countDocuments({"category": "order"});

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages && pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const orders = await query; 

    res.status(200).json({
      pages: {
        page: page,
        totalPages: pages 
      },
      orders: orders,
    }); 
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
})
// router.get("/orders", (req, res) => {
//   Stock.find({"category": "order"}).sort({orderdate: 'asc'})
//     .then(orders => res.json(orders))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// @route POST api/stock/addorder
// @desc Add request
router.post("/addorder", upload.single('pdfdata'), (req, res) => {

  const item_id = req.body.item_id; 
  const new_id = req.body.id; 
  const category = "order";
  const tracking = req.body.tracking;
  const status = "On Schedule";
  const orderdate = req.body.orderdate;
  const orderuser = req.body.orderuser;
  const pdfname = req.file.filename; 
  
  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "id": new_id,
        "category": category, 
        "tracking": tracking,
        "status": status, 
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

  const item_id = req.body.item_id; 
  const status = req.body.status;

  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "status": status 
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

module.exports = router;
  
