var Users = require('./userModel.js');
var q = require('q');

module.exports = function(app) {
  console.log("in user router");
  var findOrCreate = q.nbind(Users.findOneAndUpdate, Users);
  var findUser = q.nbind(Users.find, Users);
  

  app.route('/:id/:location')
    .get(function(req, res) {
      console.log('in user get, this is the req.params - ', req.params);
      console.log('in user get, this is the req.body, not req.data - ', req.body);
      findUser({
        $and: [{
          $or: [{"location.myPlace.city": req.params.location}, {"location.desiredPlace.city": req.params.location}]
        }, {
          fbid: {$ne: req.params.id}
        }]
      })
      .then(function(data){
        console.log("response data for candidates ", data)
        res.send(data);
      })
    })
    

  app.route('/:id')

    .post(function(req, res) {
      // console.log("params ", req.params)
      // console.log("body ", req.body)

      findOrCreate(
        {fbid: req.params.id}, 
        {$setOnInsert: {
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
    })

    .put(function(req, res) {
      console.log("PUT params ", req.params)
      console.log("PUTbody ", req.body)

      findOrCreate(
        {fbid: req.params.id}, 
        {$set: {
          candidate: req.body
          // fbid: req.params.id, 
          // name: req.body.candidate.name,
          // profile: req.body.candidate.profile,
          // location: req.body.candidate.location,
          // roommatePreferences: req.body.candidate.roommatePreferences,
          // liked: req.body.candidate.liked
          }
        },
        {upsert: true, new: true}
      )
      .then(function(user) {
        console.log("user from db in PUT ", user)
        res.send(user);
      });
    })

  app.route('/:id/location')
    .put(function(req, res) {
      console.log("in location put");
      console.log('req params for location - ', req.params);
      console.log('req body for location - ', req.body)
      findOrCreate(
        {fbid: req.params.id }, 
        {$set: {location: req.body.location}},
        {upsert: true, new: true}
      )
      .then(function(user){
        console.log("user coming back from location put request ", user)
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
  app.route('/:id/roommatePreferences')
    .put(function(req, res) {
      console.log("in roommatePreferences put");
      console.log('req params id check - ', req.params);
      findOrCreate(
        {fbid: req.params.id }, 
        {$set: {roommatePreferences: req.body.roommatePreferences}},
        {upsert: true, new: true}
      )
      .then(function(user){
        res.send(user);
      });
    })

  app.route('/:id/profile')
    .put(function(req, res) {
      console.log("in profile put");
      console.log('req params id check - ', req.params);
      findOrCreate(
        {fbid: req.params.id }, 
        {$set: {profile: req.body.profile}},
        {upsert: true, new: true}
      )
      .then(function(user){
        res.send(user);
      });
    })

}
