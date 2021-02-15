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
      if (lastRequest.length === 0) {
        console.log('attenzione lastrequest is null');
        lastRequest = [{ id: 0 }]; 
      };
      res.json(lastRequest);
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
  
  // console.log('req.body.id is ' + req.body.id); 
  // console.log('req.body.article is ' + req.body.article); 
  // console.log('req.body.index is ' + req.body.index); 
  // console.log('req.body.quantity is ' + req.body.quantity); 
  // console.log('req.body.unitcost is ' + req.body.unitcost); 
  // console.log('req.body.requestdate is ' + req.body.requestdate); 
  // console.log('req.body.requestuser is ' + req.body.requestuser); 

  const id = req.body.id; 
  const category = "request"; //req.body.category;
  const article = req.body.article;
  const index = req.body.index;
  const quantity = Number(req.body.quantity);
  const unitcost = Number(req.body.unitcost);
  const requestdate = req.body.requestdate;
  const requestuser = req.body.requestuser;
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

  const newStock = new Stock({
    id, 
    category,  
    article,  
    index, 
    quantity,  
    unitcost,  
    requestdate,  
    requestuser,  
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
    updatenoteuser 
  });

  newStock.save()
  .then(request => res.json(request))
  .catch(err => {
    console.log('Error in POST /addrequest : ' + err);
    res.status(400).json('Error: ' + err);
  } );
});

module.exports = router;
  
