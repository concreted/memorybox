var Sequelize = require('sequelize');
var sequelize = require('../db');

var Link = sequelize.define('Link', {
  name: Sequelize.STRING,
  url: Sequelize.STRING,
  // image
});

module.exports = Link;
