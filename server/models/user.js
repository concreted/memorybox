var Sequelize = require('sequelize');
var sequelize = require('../db');
var Link = require('./link');
var bcrypt = require('bcrypt');


function hashPasswordHook(user, options, done) {
  if (!user.changed('password')) {
    done();
  }
  bcrypt.hash(user.get('password'), 10, function(err, hash) {
    if (err) {
      done(err);
    }
    user.set('password', hash);
    done();
  });
}

var User = sequelize.define('User', {
  name: Sequelize.STRING,
  password: Sequelize.STRING
});

User.beforeCreate(hashPasswordHook);
User.beforeUpdate(hashPasswordHook);

User.hasMany(Link);
User.hasMany(User, {as: 'Friends'});

module.exports = User;
