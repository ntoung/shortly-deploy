var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

db.UserSchema = mongoose.Schema({
  username: 'string',
  password: 'string'
});

db.UserSchema.post('validate', function(user) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
});

var User = mongoose.model('User', db.UserSchema);

User.prototype.fetch = function() {
  // perform fetch query
  this._id = undefined;
  console.log('this ',this);

  return User.findOne(this);
};


User.prototype.comparePassword = function(attemptedPassword, callback) {
  console.log('attemptedPassword: ', attemptedPassword);
  console.log('this password: ', this.get('password'));
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    console.log('isMatch: ', isMatch);
    callback(isMatch);
  });
};

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

module.exports = User;
