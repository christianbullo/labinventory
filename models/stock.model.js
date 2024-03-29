const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StockSchema = new Schema({
  id: { type: Number, required: true},
  category: { type: String, required: true }, // request - order - instock - outofstock
  article: { type: String, required: true },
  typeofarticle: { type: String, required: true }, 
  index: { type: String, required: true }, 
  quantity: { type: Number, required: true },
  unitcost: { type: Number, required: true },
  totalcost: { type: Number, required: true },
  unitsize: { type: String, required: true }, 
  requestdate: { type: Date, required: true },
  requestuser: { type: String, required: true }, 
  vendor: { type: String }, 
  contact: { type: String }, 
  pdfname: { type: String },
  tracking: { type: String }, 
  status: { type: String },
  orderdate: { type: Date },
  orderuser: { type: String },
  location: { type: String },
  imgname: { type: String },
  deliverydate: { type: Date },
  deliveryuser: { type: String },
  aliquot: { type: String },
  stocknotes: { type: String },
  updateqtydate: { type: Date },
  updateqtyuser: { type: String },
  updatelocdate: { type: Date },
  updatelocuser: { type: String },
  updatealiqdate: { type: Date },
  updatealiquser: { type: String },
  updatenotedate: { type: Date },
  updatenoteuser: { type: String }, 
  updatevendordate: { type: Date },
  updatevendoruser: { type: String },
  registrationdate: { type: Date },
  registrationuser: { type: String }
});

module.exports = Stock = mongoose.model("Stock", StockSchema);