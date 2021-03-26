const express = require("express");
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

require('dotenv').config();

// DB Config
const mongoUri = process.env.DB_URL || 'mongodb://localhost:27017/labinventory';

// Create a new MongoClient
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// @route DELETE api/cancelfiles 
// @desc Delete image old
router.delete("/:filename", (req, res) => {

    //const item_id = req.body.item_id; 
    var item_id;  
    const filename = req.params.filename; 
    console.log('filename is ' + filename);

    client.connect((err, client) => {

        const db = client.db('labinventory'); 
        const collFiles = db.collection('uploads.files');

        //const collFiles = client.collection('uploads.files');
        // collFiles.find({filename: filename}, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //         res.status(500);
        //     }
        //     console.log(Object.values(result));
        //     //return item_id = result._id;
        // });
        // let item = collFiles.findOne({filename: filename}, (err, item) => {
        //     if (err) {
        //         console.log(err);
        //         res.status(500);
        //     } else {
        //         console.log(item);
        //         item_id = item._id;                
        //     }
        // });

        //item_id = mongodb.ObjectId("603578ccf1e94e4b8458a04f");
        collFiles.deleteOne({_id: ObjectId("603578ccf1e94e4b8458a04f")}, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
            }
            console.log('removed files: ' + result);
        });

        const collChunks = db.collection('uploads.chunks');
        collChunks.deleteMany({files_id: ObjectId("603578ccf1e94e4b8458a04f")}, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500);
            }
            console.log('removed chunks: ' + result);
        });

        client.close();
    });
    res.status(200).send({item_id});
});

module.exports = router;
  