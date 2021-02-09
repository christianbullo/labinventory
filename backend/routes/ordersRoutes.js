const express = require("express");
const router = express.Router();

// Load input validation
//const validateRequestInput = require("../validation/order");

// Load Stock model
const Stock = require("../models/stock.model");

// @route GET api/stock/lastorder
// @desc Get last request id
router.get("/lastorder", (req, res) => {
  Stock.find({"category": "order"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
    .then(lastOrder => {
      res.json(lastOrder);
        console.log("lastOrder is " + lastOrder);
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
router.post("/addorder", (req, res) => {
  
  const item_id = req.body.item_id; 
  const new_id = req.body.id; 
  const category = "order";  
  const tracking = req.body.tracking;
  const index = req.body.index;
  const orderdate = req.body.orderdate;
  const orderuser = req.body.orderuser;

  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "id": new_id,
        "category": category, 
        "tracking": tracking,
        "index": index, 
        "orderdate": orderdate,
        "orderuser": orderuser
      } 
    })
  .then(order => {
    res.json(order);
    console.log('order updated: ' + order);
  })
  //.then(() => res.json('Request added!'))
  .catch(err => {
    console.log('!!!!Error: ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

module.exports = router;
  
