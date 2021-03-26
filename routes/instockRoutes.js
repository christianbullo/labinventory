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
router.get("/lastinstock", async (req, res) => {
  try {
    let lastInstock = await Stock.find({"category": "instock"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1);
    if (!lastInstock.length) {
      lastInstock = [{ id: 0 }]; 
    }
    res.status(200).json(lastInstock);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});
// router.get("/lastinstock", (req, res) => {
//   Stock.find({"category": "instock"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
//     .then(lastInstock => {
//       if (lastInstock.length === 0) {
//         lastInstock = [{ id: 0 }]; 
//       };
//       res.json(lastInstock);
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// @route GET api/stock/instock/instock 
// @desc Get instock
router.get("/instock", async (req, res) => {
  try {
    //const instock = await Stock.find({"category": "instock"}).sort({orderdate: 'asc'});
    let query = Stock.find({"category": "instock"}).sort({id: 'asc'});

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = await Stock.countDocuments({"category": "instock"});

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages && pages) {
      return page = pages; 
    }

    const instock = await query; 

    res.status(200).json({
      pages: {
        page: page,
        totalPages: pages 
      },
      instock: instock,
    });
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});
// router.get("/instock", (req, res) => {
//   Stock.find({"category": "instock"}).sort({orderdate: 'asc'})
//     .then(instock => res.json(instock))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

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
    }, { new: true }
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
    }, { new: true })
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
    }    
  }

  const item_id = req.body.item_id; 
  
  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: updates }, 
    { new: true }
  )
  .then(order => {
    res.json(order);
  })
  .catch(err => {
    console.log('Error in POST /editdetails: ' + err);
    res.status(400).json('Error: ' + err);
  } );

});

// @route POST api/stock/instock/editstockpdf
// @desc Update pdf of item in stock  
router.post("/editstockpdf", upload.single('pdfdata'), (req, res) => {

  const item_id = req.body.item_id; 
  const pdfname = req.file.filename;
  
  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "pdfname": pdfname 
      } 
    }, { new: true })
  .then(order => {
    res.json(order);
  })
  .catch(err => {
    console.log('Error in POST /editstockpdf: ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

// @route POST api/stock/saveinstock
// @desc SAVE existing item 
router.post("/saveinstock", (req, res) => {
  // Form validation
  //const { errors, isValid } = validateRequestInput(req.body);

  // Check validation
  // if (!isValid) {
  //     return res.status(400).json(errors);
  // }

  const id = req.body.id; 
  const category = "instock"; 
  const article = req.body.article;
  const typeofarticle = req.body.typeofarticle;
  const index = req.body.index;
  const quantity = Number(req.body.quantity);
  const unitcost = Number(req.body.unitcost);
  const totalcost = Number(quantity * unitcost); 
  const unitsize = req.body.unitsize;
  const requestdate = req.body.registrationdate;
  const requestuser = req.body.registrationuser;
  const vendor = req.body.vendor;
  const contact = req.body.contact;
  const pdfname = "";
  const tracking = ""; 
  const status = ""; 
  const orderdate = "";
  const orderuser = "";
  const location = "";
  const imgname = "";
  const deliverydate = ""; 
  const deliveryuser = "";
  const aliquot = ""; 
  const stocknotes = "";
  const updateqtydate = ""; 
  const updateqtyuser = "";
  const updatelocdate = ""; 
  const updatelocuser = "";
  const updatealiqdate = ""; 
  const updatealiquser = "";
  const updatenotedate = ""; 
  const updatenoteuser = "";
  const updatevendordate = "";
  const updatevendoruser = "";
  const registrationdate = req.body.registrationdate;
  const registrationuser = req.body.registrationuser;

  const newStock = new Stock({
    id, 
    category,  
    article,  
    typeofarticle,
    index, 
    quantity,  
    unitcost,  
    totalcost, 
    unitsize,
    requestdate,  
    requestuser,  
    vendor, 
    contact, 
    pdfname,  
    tracking,  
    status,  
    orderdate,  
    orderuser,  
    location,  
    imgname,  
    deliverydate,  
    deliveryuser,  
    aliquot,  
    stocknotes,  
    updateqtydate,   
    updateqtyuser, 
    updatelocdate,   
    updatelocuser,  
    updatealiqdate,   
    updatealiquser,   
    updatenotedate,   
    updatenoteuser,
    updatevendordate,
    updatevendoruser,
    registrationdate,
    registrationuser 
  });

  newStock.save()
  .then(request => res.json(request))
  .catch(err => {
    console.log('Error in POST /saveinstock : ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

module.exports = router;
  
