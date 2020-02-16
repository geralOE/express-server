const config = require('../config/config');
var express = require('express');
var mongoose =  require('mongoose');
var router = express.Router();

// Load variables for mongodb
const dbHost = config.db.dbHost;
const dbName = config.db.dbName;

// Connect to mongodb
const db = mongoose.connect(dbHost, (error, client) => {
      if(error) {
        console.log("Error mongoose connection! " + error);
        throw error;
      } 
   console.log("Connected to database!");
});


/* Listing API */
router.get('/', (req, res) => {
    res.send('Welcome API!!!');
})

// Add routes member.js
router.use(require('./member.js'));

// Add routes team.js
router.use(require('./team.js'));

module.exports = router;