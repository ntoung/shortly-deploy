// NOTE: this file is not needed when using MongoDB
var db = require('../config');
var User = require('../models/user');

var Users = User.collection;

// Users.model = User;

Users.add = function(link, cb) {
  console.log('inserting link');
  Users.insert(link, cb);
  // cb(link);
};

module.exports = Users;