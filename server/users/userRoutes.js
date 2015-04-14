var Users = require('./userModel.js');
var q = require('q');

module.exports = function(app) {
  console.log("in user router")
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
      var findOrUpdate = q.nbind(Users.findOneAndUpdate, Users)

      findOrUpdate(
        {fbid: req.params.id}, 
        {$setOnInsert: {
          fbid: req.params.id, 
          name: req.body.name}
        }, {
          upsert: true,
          new: true
        }
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
    .post(function(req, res) {
      Users.findOneAndUpdate({id: req.params.id }, {location: req.params.body})
    })
}