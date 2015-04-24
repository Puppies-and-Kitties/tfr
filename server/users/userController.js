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
    var latitude = req.param('lat');
    var longitude = req.param('longt');
    var radius = req.param('radi')*1.6/6370;
    findUsers({
      loc: {$nearSphere: [latitude,longitude],$maxDistance: radius},
      fbid: {$ne: ""+req.params.id}})
    // var findCandidates = Q.nbind(Users.find, Users);
    // var findUser = Q.nbind(Users.findOne, Users);
    .then(function(data){
      //console.log('getCandidates:',data);
      res.send(data);
    })
  },

  /////////////////HAVING TROUBLE WITH FINDING OBJECT IDS//////////
  ///////////////TRYING TO USE THIS CODE IN THE ABOVE FUNCTION////////
  // findUser({fbid: req.params.id})
  //   .then(function(user) {
  //     console.log("user found when getting candidates ", user)
  //     findCandidates({
  //       $and: [{
  //         $or: [{"location.myPlace.city": req.params.location}, {"location.desiredPlace.city": req.params.location}]
  //       }, {
  //         _id: {$ne: {$in: user.matched}}
  //       }, {
  //         _id: {$ne: user.id}
  //       }]
  //     })
  //     .then(function(data){
  //       console.log("candidates ", data)
  //       res.send(data);
  //     })
  //   })
  addOrFindCurrentUser: function(req, res) {
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
        roommatePreferences: req.body.roommatePreferences
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
    // var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
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
    console.log("request to getMatches ", req.params)
    // var findUser = Q.nbind(Users.findOne, Users);
    // var findMatches = Q.nbind(Users.find, Users);
    
    findUser({fbid: req.params.id})
      .then(function(user){
        console.log("user matched ", user.matched)
        var matches = Object.keys(user.matched);
        console.log("matches variable ", matches)
        findUsers({_id: {$in: matches}})
          .then(function(matches) {
            console.log("matches", matches)
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


