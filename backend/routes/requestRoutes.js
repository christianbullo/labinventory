const express = require("express");
const router = express.Router();

// Load input validation
const validateRequestInput = require("../validation/request");

// Load Stock model
const Stock = require("../models/stock.model");

// @route GET api/stock/lastrequest
// @desc Get last request id
router.get("/lastrequest", (req, res) => {
  Stock.find({"category": "request"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
    .then(lastRequest => {
      res.json(lastRequest);
        console.log("lastRequest is " + lastRequest);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route GET api/stock/requests
// @desc Get requests
router.get("/requests", (req, res) => {
  Stock.find({"category": "request"}).sort({requestdate: 'asc'})
    .then(requests => res.json(requests))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/stock/addrequest
// @desc Add request
router.post("/addrequest", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRequestInput(req.body);

  // Check validation
  if (!isValid) {
      return res.status(400).json(errors);
  }
  
  const id = req.body.id; 
  const category = "request"; //req.body.category;
  const article = req.body.article;
  const quantity = Number(req.body.quantity);
  const unitcost = Number(req.body.unitcost);
  const requestdate = req.body.requestdate;
  const requestuser = req.body.requestuser;
  const orderdate = "";
  const orderuser = "";
  const deliverydate = ""; 
  const deliveryuser = "";
  const stocknotes = "";
  const location = "";
  const sublocation = ""; 
  const status = ""; 

  const newStock = new Stock({
    id, 
    category,
    article, 
    quantity,
    unitcost,
    requestdate,
    requestuser,
    orderdate,
    orderuser,
    deliverydate,
    deliveryuser,
    stocknotes,
    location,
    sublocation,
    status 
  });

  newStock.save()
  .then(request => res.json(request))
  //.then(() => res.json('Request added!'))
  .catch(err => {
    console.log('!!!!Error: ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

module.exports = router;
  
