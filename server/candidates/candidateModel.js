var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
  id: Number,
  likesUser: Boolean,
  userLikes: Boolean,
  seen: Boolean,
  isMatch: Boolean
});


var Candidate = mongoose.model('Candidate', CandidateSchema)
module.exports = Candidate;
