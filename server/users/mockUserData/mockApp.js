var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mockData = require('./mockData.json');

// Connection URL
var url = 'mongodb://localhost:27017/roome';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  insertDocuments(db, function() {
    db.close();
  });
});


var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('users');
  // Insert some documents
  collection.insert(mockData, function(err, result) {
    assert.equal(err, null);
    assert.equal(result.ops.length, result.result.n);
    console.log('result - ', result);
    console.log("Inserted " + result.ops.length + " documents into the users collection");
    callback(result);
  });
}