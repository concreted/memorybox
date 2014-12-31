module.exports = config;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('../routes');

function config(app) {
  app.use(bodyParser.json());
  app.use(express.static(path.normalize(__dirname + '../../../client')));
  app.use(routes);
}
