const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

require('dotenv').config();

const users = require("./routes/userRoutes");
const requests = require("./routes/requestRoutes");
const orders = require("./routes/ordersRoutes"); 

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded(
  {
    extended: false
  }
));

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

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/stock/requests", requests);
app.use("/api/stock/orders", orders); 

const port = process.env.PORT || 5000; // process.env.port is Heroku's port 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

