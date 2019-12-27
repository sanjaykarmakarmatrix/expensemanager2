const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// This will be our application entry. We'll setup our server here.
const http = require('http');

// Set up the express app
const app = express();
var cors = require('cors');

var corsOptions = {
    origin: "*",
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'x-reset-token', 'x-invite-token','x-access-token','_token', 'x-api-key', 'x-www-form-urlencoded'],
    credentials: false
};
app.use(cors(corsOptions));

// Log requests to the console.
// app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/', (req, res) => res.status(200).send({
    message: 'Welcome to expense manager',
}));

const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

//Route declaration
app.use(require('./routes/api'));

module.exports = app;