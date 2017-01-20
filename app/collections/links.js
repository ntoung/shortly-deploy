// NOTE: this file is not needed when using MongoDB
var db = require('../config');
var Link = require('../models/link');

// var Links = db.collections.urls;
var Links = Link.collection;

//var Links = {};

Links.model = Link;

Links.add = function(link, cb) {
  console.log('inserting link');
  Links.insert(link, cb);
  // cb(link);
};

module.exports = Links;