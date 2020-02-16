// Get dependencies
const config = require('./config/config');

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get API routes
const api = require('./routes/index');

const app = express();

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));




// Set API routes
app.use('/', api);


//  Get port & Store in Express
const port = config.port;
app.set('port', port);

// Create HTTP Server
const server = http.createServer(app);


// Start server
app.listen(port, () => {
    console.log(" Listening port: " , port);
    console.log("Node server running on http://localhost:" + port);
}) 

