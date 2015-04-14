var express = require('express');
var mongoose = require('mongoose');

var app = express();

var mongoURI = process.env.MONGO || 'mongodb://localhost/roome';

mongoose.connect(mongoURI);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongodb connection open');
});

app.options(/\.*/, function (req, res, next) {
  console.log("in options")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.send(200);
  next();
});


module.exports = db;
module.exports = app;
require('./middleware.js')(app, express);
