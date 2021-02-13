const express = require("express");
const router = express.Router();

// Load input validation
//const validateRequestInput = require("../validation/order");

// Load Stock model
const Stock = require("../models/stock.model");

// @route GET api/stock/instock/lastinstock
// @desc Get last request id
router.get("/lastinstock", (req, res) => {
  Stock.find({"category": "instock"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
    .then(lastInstock => {
      res.json(lastInstock);
        //console.log("lastInstock is " + lastInstock);
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
router.post("/addinstock", (req, res) => {
  
  const item_id = req.body.item_id; 
  const new_id = req.body.id; 
  const category = "instock";  
  const deliverydate = req.body.deliverydate;
  const deliveryuser = req.body.deliveryuser;
  const stocknotes = req.body.stocknotes;
  const location = req.body.location;
  const status = " ";  

  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "id": new_id,
        "category": category, 
        "deliverydate": deliverydate, 
        "deliveryuser": deliveryuser,
        "stocknotes": stocknotes,
        "location": location,
        "sublocation": sublocation,
        "status": status
      } 
    })
  .then(instock => {
    res.json(instock);
    //console.log('order updated: ' + order);
  })
  .catch(err => {
    console.log('Error in POST /addinstock: ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

module.exports = router;
  
