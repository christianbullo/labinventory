const express = require("express");
const router = express.Router();

// Load input validation
//const validateRequestInput = require("../validation/order");

// Load Stock model
const Stock = require("../models/stock.model");

// @route GET api/stock/outstock/lastoutstock
// @desc Get last out of stock id
router.get("/lastoutstock", async (req, res) => {
  try {
    let lastOutstock = Stock.find({"category": "outofstock"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1);
    if (!lastOutstock.length) {
      lastOutstock = [{ id: 0 }]; 
    };
    res.status(200).json(lastOutstock);    
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});
// router.get("/lastoutstock", (req, res) => {
//   Stock.find({"category": "outofstock"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
//     .then(lastOutstock => {
//       if (lastOutstock.length === 0) {
//         console.log('attenzione lastOutstock is null');
//         lastOutstock = [{ id: 0 }]; 
//       };
//       res.json(lastOutstock);
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// @route GET api/stock/outstock/outstock 
// @desc Get out of stock
router.get("/outstock", async (req, res) => {
   
  try {
    //const outstock = await Stock.find({"category": "outofstock"}).sort({orderdate: 'asc'});
    let query = Stock.find({"category": "outofstock"}).sort({id: 'asc'});
    
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = await Stock.countDocuments({"category": "outofstock"});

    const pages = Math.ceil(total / pageSize);
  
    query = query.skip(skip).limit(pageSize);

    if (page > pages && pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const outstock = await query; 

    res.status(200).json({
      pages: {
        page: page,
        totalPages: pages 
      },
      outstock: outstock,
    }); 
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});
// router.get("/outstock", (req, res) => {
//   Stock.find({"category": "outofstock"}).sort({orderdate: 'asc'})
//     .then(outstock => res.json(outstock))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


// @route POST api/stock/addoutstock
// @desc Add outstock
router.post("/addoutstock", (req, res) => {

  const item_id = req.body.item_id; 
  const category = req.body.category;  
  const quantity = 0;

  Stock.findByIdAndUpdate(
    { "_id": item_id }, 
    { $set: 
      { 
        "category": category,
        "quantity": quantity
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
  
