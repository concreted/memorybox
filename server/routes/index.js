var express = require("express");
var router = express.Router();

var controllers = require('../controllers');

router.use('/api', function(req, res) {
  res.send('MemoryBox API');
});

console.log('-----------------------------')
console.log(controllers)

router.post('/auth/signup', controllers.auth.signup);

module.exports = router;
