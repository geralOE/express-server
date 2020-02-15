//require('config/config');

const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Welcome to the API Rest!');
})

// Start server
app.listen(3000, () => {
    console.log(" Listening port: " , 3000);
    console.log("Node server running on http://localhost:3000");
}) 