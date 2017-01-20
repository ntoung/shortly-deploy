var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

db.UrlSchema = mongoose.Schema({
  url: 'string',
  baseUrl: 'string',
  code: 'string',
  title: 'string',
  visits: 'number' 
});

db.UrlSchema.post('validate', function(link) {
  var shasum = crypto.createHash('sha1');
  shasum.update(link.get('url'));

  link.set('code', shasum.digest('hex').slice(0, 5));
});

var Link = mongoose.model('Url', db.UrlSchema);


// Link.remove = function() {

// };

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('  ', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

Link.prototype.fetch = function() {
  // perform fetch query
  this._id = undefined;

  return Link.findOne(this);
};

module.exports = Link;
