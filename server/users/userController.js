var Users = require('./userModel.js');
var Q = require('q');

var updateMatchObjects = function(req, res) {
  console.log("in update match objects. req: ", req.body)
};

var findUsers = Q.nbind(Users.find, Users);
var findUser = Q.nbind(Users.findOne, Users);
var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
var findAndUpdate = Q.nbind(Users.findOneAndUpdate, Users);

module.exports = {
  
  getCandidates: function(req, res) {
    console.log("req body in getCandidates ", req.query)
    console.log("req params ", req.params)
    var latitude = req.query.lat;
    var longitude = req.query.longt;
    var radius = req.query.radi*1.6/6370;
    findUser({fbid: req.params.id})
      .then(function(user) {
        console.log("got a user ", user);
        if (user.matched) {
          var matches = Object.keys(user.matched);
        } else {
          var matches = [];
        }
        var likeAndMatched = user.liked.concat(matches);
        console.log("like and match ", likeAndMatched)
        findUsers({ $and: [{
          loc: {$nearSphere: [latitude,longitude],$maxDistance: radius},
          fbid: {$ne: ""+req.params.id},
          _id: {$nin: likeAndMatched}
          }]
        })
        .then(function(data){
          data.forEach(function(user) {
            console.log("possible candidates' ids ", user.id)
          })
          res.send(data);
        })
      })
  },

  addOrFindCurrentUser: function(req, res) {
    if(req.body.location){
      var latitude = req.body.location.desiredPlace.latitude;
      var longitude = req.body.location.desiredPlace.longitude;
    } else {
      var latitude = 0;
      var longitude = 0;
    }
    findOrCreate(
      {fbid: req.params.id}, 
      {$setOnInsert: {
        loc: [latitude,longitude],
        fbid: req.params.id, 
        name: req.body.name,
        profile: req.body.profile,
        location: req.body.location,
        roommatePreferences: req.body.roommatePreferences
        }
      },
      {upsert: true, new: true}
    )
    .then(function(user) {
      res.send(user);
    });
  },

  updateProfile: function(req, res) {
    // var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
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
    findOrCreate(
      {fbid: req.params.id }, 
      {$set: {roommatePreferences: req.body.roommatePreferences}},
      {upsert: true, new: true}
    )
    .then(function(user){
      res.send(user);
    });
  },

  getMatches: function(req, res) {
    // console.log("request to getMatches ", req.params)
    
    findUser({fbid: req.params.id})
      .then(function(user){
        var matches = Object.keys(user.matched);
        findUsers({_id: {$in: matches}})
          .then(function(matches) {
            // console.log("matches", matches)
            res.send(matches);
      })
    })

  }, 


  updateUserMatches: function(req, res) {
    updateMatchObjects(req, res);
    console.log("/user: updateMatches request body ", req.body)
    // var findAndUpdate = Q.nbind(Users.findOneAndUpdate, Users);
    findAndUpdate({fbid: req.params.id},
      {$set: {matched: req.body.matchesIds, liked: req.body.likedIds}},
      {new: true}
    )
    .then(function(user) {
      console.log("user after updating matched ", user)
      res.send(user);
    })


  }

};


