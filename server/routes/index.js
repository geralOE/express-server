var express = require('express');
var mongoose =  require('mongoose');
var router = express.Router();


/* Listing API */
router.get('/', (req, res) => {
    res.send('Welcome API!!!');
})



module.exports = router;