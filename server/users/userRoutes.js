var Users = require('./userModel.js');
var q = require('q');

module.exports = function(app) {
  console.log("in user router");
  var findOrCreate = q.nbind(Users.findOneAndUpdate, Users);
  var findUser = q.nbind(Users.findOne, Users);

  app.route('/:id')
    .get(function(req, res) {
      Users.findOne({id: req.params.id}, function( err, user) {
        res.send(user);
      });
    })

    .post(function(req, res) {
      console.log("in post")
      console.log("params ", req.params)
      console.log("body ", req.body)
      //find first

      findOrCreate(
        {fbid: req.params.id}, 
        {$setOnInsert: {fbid: req.params.id, name: req.body.name}},
        {upsert: true, new: true}
      )
      .then(function(user) {
        console.log("user in post ", user)
        res.send(user);
      });
    })

    .put(function(req, res) {
      Users.findOneAndUpdate({id: req.params.id})
    })

  app.route('/:id/location')
    .put(function(req, res) {
      console.log("in location put");
      console.log('req params id check - ', req.params);
      findOrCreate(
        {fbid: req.params.id }, 
        {$set: {location: req.body.location}},
        {upsert: true, new: true}
      )
      .then(function(user){
        res.send(user);
      });
    })
    .get(function(req, res) {
      console.log('in location get');
      console.log('req params fuck shit get - ', req.params);

      findUser(
        {fbid: req.params.id}
      )

    })
}
