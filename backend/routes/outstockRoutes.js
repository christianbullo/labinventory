const express = require("express");
const router = express.Router();

// Load input validation
//const validateRequestInput = require("../validation/order");

// Load Stock model
const Stock = require("../models/stock.model");

// @route GET api/stock/outstock/lastoutstock
// @desc Get last out of stock id
router.get("/lastoutstock", (req, res) => {
  Stock.find({"category": "outofstock"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
    .then(lastOutstock => {
      res.json(lastOutstock);
        console.log("lastOutstock is " + lastOutstock);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route GET api/stock/outstock/outstock 
// @desc Get out of stock
router.get("/outstock", (req, res) => {
  Stock.find({"category": "outofstock"}).sort({orderdate: 'asc'})
    .then(outstock => res.json(outstock))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/stock/outstock/addoutstock
// @desc Add out of stock 
router.post("/addoutstock", (req, res) => {
  
  const item_id = req.body.item_id; 
  const new_id = req.body.id; 
  const category = "outofstock";  
  
  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "id": new_id,
        "category": category 
      } 
    })
  .then(outstock => {
    res.json(outstock);
  })
  .catch(err => {
    console.log('Error in POST /addoutstock: ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

module.exports = router;
  
