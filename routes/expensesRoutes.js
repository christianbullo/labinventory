const express = require("express");
const router = express.Router();

// Load Stock model
const Stock = require("../models/stock.model");

// @route GET api/expenses/ 
// @desc Get last out of stock id
router.get("/", async (req, res) => {
  try {

    let query = Stock.aggregate([
        {$group: {_id:"$typeofarticle",TotalAmount:{ $sum:"$totalcost"}}}
    ]);

    const result = await query; 

    const entries = Object.keys(result);
    const results = {};
    for (let i = 0; i < entries.length; i++) {
        results[Object.values(result)[i]._id] = Object.values(result)[i].TotalAmount;
    }

    //console.log(results);

    res.status(200).json(results);    
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;
  
