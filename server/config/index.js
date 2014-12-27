module.exports = config;

var routes = require('../routes');

function config(app) {
  routes(app);
}
