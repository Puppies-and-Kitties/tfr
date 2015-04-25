var Users = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var secret = require('./secret.js');

var updateMatchObjects = function(req, res) {
  console.log('in update match objects. req: ', req.body)
};

var findUsers = Q.nbind(Users.find, Users);
var findUser = Q.nbind(Users.findOne, Users);
var findOrCreate = Q.nbind(Users.findOneAndUpdate, Users);
var findAndUpdate = Q.nbind(Users.findOneAndUpdate, Users);
var removeUser = Q.nbind(Users.remove, Users);

module.exports = {

  auth: function(req,res){
    var token = req.body.token;
    var decoded = jwt.decode(token, secret);
    var decodedId = decoded.d.uid.match(/\d+/)[0];
    var tokenTail = token.match(/(\.[^\.]+)/g).slice(1);
    if(req.params.id === decodedId){
      findOrCreate(
        {fbid: req.params.id}, 
        {$setOnInsert: {
          fbid: req.params.id, 
          token: tokenTail
          }
        },
        {upsert: true, new: true}
      )
      .then(function(user) {
        console.log('AUTHUSER',user);
        res.send(user);
      });
    }
  },
  
  getCandidates: function(req, res) {
    console.log('req body in getCandidates ', req.query)
    console.log('req params ', req.params)
    var latitude = req.query.lat;
    var longitude = req.query.longt;
    var radius = req.query.radi*1.6/6370;
    console.log('req.query.token',req.query.token);
    findUser({fbid: req.params.id,token: req.query.token})
      .then(function(user) {
        console.log('got a user ', user);
        if (user.matched) {
          var matches = Object.keys(user.matched);
        } else {
          var matches = [];
        }
        var likeAndMatched = user.liked.concat(matches);
        console.log('like and match ', likeAndMatched)
        findUsers({ /*$and: [{*/
          loc: {$nearSphere: [latitude, longitude], $maxDistance: radius},
          fbid: {$ne: '' + req.params.id},
          _id: {$nin: likeAndMatched}
          /*}]*/
        })
        .then(function(data){
          data.forEach(function(user) {
            console.log('possible candidates\' ids ', user.id);
          })
          res.send(data);
        })
      })
  },

  addOrFindCurrentUser: function(req, res) {
    console.log('req.body!!!',req.body);
    if(req.body.location){
      var latitude = req.body.location.desiredPlace.latitude;
      var longitude = req.body.location.desiredPlace.longitude;
    } else {
      var latitude = 0;
      var longitude = 0;
    }
    findAndUpdate(
      {fbid: req.params.id,token: req.body.token}, 
      {$setOnInsert: {
        loc: [latitude,longitude],
        fbid: req.params.id,
        token: req.body.token, 
        name: req.body.name,
        profile: req.body.profile,
        location: req.body.location,
        roommatePreferences: req.body.roommatePreferences
        }
      },
      {upsert: false, new: true}
    )
    .then(function(user) {
      res.send(user);
    });
  },

  updateProfile: function(req, res) {
    console.log('params in updateProperty ', req.params);
    findOrCreate(
      {fbid: req.params.id,token: req.query.token}, 
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
    console.log('updateLocation!!!',req.query);
    findOrCreate(
      {fbid: req.params.id,token: req.query.token}, 
      {$set: {loc: [latitude, longitude], location: req.body.location}},
      {upsert: true, new: true}
    )
    .then(function(user){
      res.send(user);
    });
  },

  updateRoommatePreferences: function(req, res) {
    findOrCreate(
      {fbid: req.params.id,token: req.query.token}, 
      {$set: {roommatePreferences: req.body.roommatePreferences}},
      {upsert: true, new: true}
    )
    .then(function(user){
      res.send(user);
    });
  },

  getMatches: function(req, res) {    
    findUser({fbid: req.params.id,token: req.query.token})
      .then(function(user){
        var matches = Object.keys(user.matched);
        findUsers({_id: {$in: matches}})
          .then(function(matches) {
            res.send(matches);
      })
    })
  }, 

  updateUserMatches: function(req, res) {
    updateMatchObjects(req, res);
    console.log('/user: updateMatches request body ', req.body);
    findAndUpdate({fbid: req.params.id,token: req.query.token},
      {$set: {matched: req.body.matchesIds, liked: req.body.likedIds}},
      {new: true}
    )
    .then(function(user) {
      res.send(user);
    })
  },

  deleteAccount: function(req, res) {
    console.log("in delete request ", req.params)
    findUser({fbid: req.params.id,token: req.query.token})
      .then(function(user) {
        removeUser({_id: user.id})
          .then(function(data) {
            res.send("User deleted")
          })
      })
  }

};
