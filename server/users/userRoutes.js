var userController = require('./userController.js');

module.exports = function(app) {

  app.route('/:id/location')
    .get(userController.getCandidates)

  app.route('/:id')
    .post(userController.addOrFindCurrentUser) 
  
  app.route('/:id/location')
    .put(userController.updateLocation)
    
  app.route('/:id/roommatePreferences')
    .put(userController.updateRoommatePreferences)
    
  app.route('/:id/profile')
    .put(userController.updateProfile)

  app.route('/:id/matches')
    .get(userController.getMatches)
    .put(userController.updateUserMatches)
  
  app.route('/:id/:location')
    .get(userController.getCandidates)

}
    ////////////////FOR MOCK DATA///////////////
    // .put(function(req, res) {
    //   findOrCreate(
    //     {fbid: req.params.id}, 
    //     {$set: {
    //       candidate: req.body
    //       // fbid: req.params.id, 
    //       // name: req.body.candidate.name,
    //       // profile: req.body.candidate.profile,
    //       // location: req.body.candidate.location,
    //       // roommatePreferences: req.body.candidate.roommatePreferences,
    //       // liked: req.body.candidate.liked
    //       }
    //     },
    //     {upsert: true, new: true}
    //   )
    //   .then(function(user) {
    //     res.send(user);
    //   });
    // })

  
