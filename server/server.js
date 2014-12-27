var express = require('express');
var app = express();

var config = require('./config');
config(app);

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log("Listening on port " + port);
});
