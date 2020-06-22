const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// set up the express app
const app = express();

// log requests to the console
app.use(logger('dev'));

// parse incoming requests 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

// require routes into the application
require('./server/routes')(app);

// set up a default catch-all route to send back a welcome text
app.get('*', (req, res) => res.status(200).send({
    message: "Welcome to the beginning of nothingness"
}));

module.exports = app;