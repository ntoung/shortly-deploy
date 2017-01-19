var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

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
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

Link.prototype.fetch = function() {
  // perform fetch query
  console.log(this);
  this.get('url');
};

module.exports = Link;
