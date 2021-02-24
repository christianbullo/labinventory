const express = require("express");
const router = express.Router();

// Load input validation
const validateRequestInput = require("../validation/request");

// Load Stock model
const Stock = require("../models/stock.model");

// @route GET api/stock/lastrequest
// @desc Get last request id
router.get("/lastrequest", async (req, res) => {
  try {
    let lastRequest = await Stock.find({"category": "request"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1);
    // When there are no matches find() returns [], while findOne() returns null
    if (!lastRequest.length) {
      lastRequest = [{ id: 0 }]; 
    }
    res.status(200).json(lastRequest);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});
// router.get("/lastrequest", (req, res) => {
//   Stock.find({"category": "request"}, {"id": 1, "_id": 0}).sort({"id":-1}).limit(1)
//     .then(lastRequest => {
//       if (lastRequest.length === 0) {
//         console.log('attenzione lastrequest is null');
//         lastRequest = [{ id: 0 }]; 
//       };
//       res.json(lastRequest);
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// @route GET api/stock/requests
// @desc Get requests
router.get("/requests", async (req, res) => {
  try {
    //const requests = await Stock.find({"category": "request"}).sort({requestdate: 'asc'});
    let query = Stock.find({"category": "request"}).sort({id: 'asc'});

    let page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const total = await Stock.countDocuments({"category": "request"});

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages && pages) {
      return page = pages; 
    }

    const requests = await query; 

    res.status(200).json({
      pages: {
        page: page,
        totalPages: pages 
      },
      requests: requests,
    }); 
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});
// router.get("/requests", (req, res) => {
//   Stock.find({"category": "request"}).sort({requestdate: 'asc'})
//     .then(requests => res.json(requests))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

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
  const category = "request"; 
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
  
