const express = require("express");
const router = express.Router();

const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');

const DIR = "./public/";

// setup storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "application/pdf") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .pdf format allowed!'));
      }
  }
});

// Load input validation
//const validateOrderInput = require("../validation/order");

// Load Stock model
const Stock = require("../models/stock.model");

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
  // if (!isValid) {
  //     return res.status(400).json(errors);
  // }
  const url = req.protocol + '://' + req.get('host');

  const item_id = req.body.item_id; 
  const new_id = req.body.id; 
  const category = "order";
  const tracking = req.body.tracking;
  const orderdate = req.body.orderdate;
  const orderuser = req.body.orderuser;
  const pdfname = req.file.filename;
  //const pdfdata = url + '/public/' + req.file.filename; //req.file.path;
  const pdfdata = fs.readFileSync(req.file.path);

  console.log('req.body.item_id', req.body.item_id);
  console.log('req.body.item_id', req.body.id);
  console.log('req.body.tracking', req.body.tracking);  
  console.log('req.body.orderdate', req.body.orderdate); 
  console.log('req.body.orderuser', req.body.orderuser);
  console.log('req.body.pdfname', req.body.pdfname);
  console.log('req.file.filename', req.file.filename);
  console.log('req.file.path', req.file.path);

  console.log('pdfdata', pdfdata);

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

module.exports = router;
  
