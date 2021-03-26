const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const path = require('path');

require('dotenv').config();

const users = require("./routes/userRoutes");
const requests = require("./routes/requestRoutes");
const orders = require("./routes/ordersRoutes"); 
const instock = require("./routes/instockRoutes");
const outstock = require("./routes/outstockRoutes");
const files = require("./routes/filesRoutes");
const expenses = require("./routes/expensesRoutes");
const cancelfiles = require("./routes/cancelFilesRoutes");

// setup express app server 
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded(
  {
    extended: true
  }
));
app.use(cors());

// DB Config
const mongoUri = process.env.DB_URL || 'mongodb://localhost:27017/labinventory';

// Connect to MongoDB
mongoose
  .connect(
    mongoUri,
    { useNewUrlParser: true, 
      useCreateIndex: true, 
      useUnifiedTopology: true, 
      useFindAndModify: false 
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// pending connection to the test database running on localhost  
const conn = mongoose.connection;

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/stock/requests", requests);
app.use("/api/stock/orders", orders); 
app.use("/api/stock/instock", instock); 
app.use("/api/stock/outstock", outstock); 

app.use("/api/files", files); 

app.use("/api/expenses", expenses); 

//app.use("/api/cancelfiles", cancelfiles); 

const port = process.env.PORT || 5000; // process.env.port is Heroku's port 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

