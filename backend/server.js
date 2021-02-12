const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const cors = require("cors");
//const methodOverride = require("method-override");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");

require('dotenv').config();

const users = require("./routes/userRoutes");
const requests = require("./routes/requestRoutes");
const orders = require("./routes/ordersRoutes"); 
const instock = require("./routes/instockRoutes");
const outstock = require("./routes/outstockRoutes");
const files = require("./routes/filesRoutes");
const oldfiles = require("./routes/old_filesRoutes");

// Storage: sets up where to store POST files
// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//       cb(null, 'uploads/');
//   }
// });
//const upload = multer({ storage: storage }); 

// create storage engine 
// const storage = new GridFsStorage({
//   url: mongoUri,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       // encrypt filename before storing it
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads"
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({
//   storage
// });

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

app.use('/public', express.static('public'));

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

//app.use("/api/stock/files", oldfiles);
app.use("/api/files", files); 

const port = process.env.PORT || 5000; // process.env.port is Heroku's port 

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

