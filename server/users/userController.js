var Users = require('./userModel.js');
var Q = require('q');

module.exports = {
  
  getCandidates: function(req, res) {
    console.log("in the pretty new getCandidates function")
    var findCandidates = Q.nbind(Users.find, Users);
    var latitude = req.param('lat');
    var longitude = req.param('longt');
    var radius = req.param('radi')*1.6/6370;
    findCandidates({
      loc: {$nearSphere: [latitude,longitude],$maxDistance: radius},
      fbid: {$ne: ""+req.params.id}})
    .then(function(data){
      //console.log('getCandidates:',data);
      res.send(data);
    })
  },

  addOrFindCurrentUser: function(req, res) {
    var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
    if(req.body.location){
      var latitude = req.body.location.desiredPlace.latitude;
      var longitude = req.body.location.desiredPlace.longitude;
    } else {
      var latitude = 0;
      var longitude = 0;
    }
    console.log("id:",req.params.id);
    findOrCreate(
      {fbid: req.params.id}, 
      {$setOnInsert: {
        loc: [latitude,longitude],
        fbid: req.params.id, 
        name: req.body.name,
        profile: req.body.profile,
        location: req.body.location,
        roommatePreferences: req.body.roommatePreferences,
        liked: req.body.liked
        }
      },
      {upsert: true, new: true}
    )
    .then(function(user) {
      console.log("user from db in post ", user)
      res.send(user);
    });
  },

  updateProfile: function(req, res) {
    var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
    console.log("params in updateProperty ", req.params)
    findOrCreate(
      {fbid: req.params.id }, 
      {$set: {profile: req.body.profile}},
      {upsert: true, new: true}
    )
    .then(function(user){
      res.send(user);
    });
  }, 

  updateLocation: function(req, res) {
    var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
    var latitude = req.body.location.desiredPlace.latitude;
    var longitude = req.body.location.desiredPlace.longitude;
    findOrCreate(
      {fbid: req.params.id }, 
      {$set: {loc:[latitude,longitude],location: req.body.location}},
      {upsert: true, new: true}
    )
    .then(function(user){
      res.send(user);
    });
  },

  updateRoommatePreferences: function(req, res) {
    var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
      findOrCreate(
        {fbid: req.params.id }, 
        {$set: {roommatePreferences: req.body.roommatePreferences}},
        {upsert: true, new: true}
      )
      .then(function(user){
        res.send(user);
      });
  }
};