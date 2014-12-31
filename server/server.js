var express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

// Connect to DB.
var db = require('./db');

// Configure Server
var config = require('./config');
config(app);


var server = app.listen(port, function() {
  console.log("Listening on port " + port);
});

module.exports = app;
