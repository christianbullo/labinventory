const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StockSchema = new Schema({
  id: { type: Number, required: true },
  category: { type: String, required: true, default: "request" }, // request - order - instock - outofstock
  article: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitcost: { type: Number, required: true },
  requestdate: { type: Date, required: true },
  requestuser: { type: String, required: true },
  orderdate: { type: Date, default: Date.now },
  orderuser: { type: String },
  deliverydate: { type: Date, default: Date.now },
  deliveryuser: { type: String },
  stocknotes: { type: String },
  location: { type: String },
  sublocation: { type: String },
  status: { type: String }
});

module.exports = Stock = mongoose.model("Stock", StockSchema);