var User = require('../models/user');
var Link = require('../models/link');

module.exports = {
  signup: signup
};

function userExists(name, found, notFound) {
  User.find({
    where: {name: name}
  }).then(function(user) {
    if (user === null) {
      notFound();
    }
    else {
      found();
    }
  });
}

function signup(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  userExists(name, function() {
    res.send(409);
  }, function() {
    User.create({
      'name': name,
      'password': password
    })
    .then(function() {
      res.send(200);
    });
  });

}
