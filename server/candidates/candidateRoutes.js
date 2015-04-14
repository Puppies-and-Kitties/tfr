var Candidates = require('./candidateModel.js').Candidates;

module.exports = function(app) {
  console.log("in user router")
  app.route('/:id')
    .get(function(req, res) {
      Candidates.findOne({id: req.params.id}, function( err, user) {
        res.send(user);
      });
    })
    .post(function(req, res) {
      console.log("in post")
      Candidates.create({name: req.params.name })
    })
}