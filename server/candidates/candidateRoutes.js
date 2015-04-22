var candidateController = require('./candidateController.js')

module.exports = function(app) {

app.route('/matches')
  .put(candidateController.updateCandidates)
};
//   console.log("in user router")
//   var findOrCreate = q.nbind(Users.findOneAndUpdate, Users);


// Get request to candidates will return the 10 closest candidates
// Another thought with distance is to go back to using zip codes on the backend
  // would be easier to queary the database for users that have a zip code of 'x', 'y', or 'z'
  // as opposed to checking if their latitude and longitude are within the range
