var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  loc: { type: [Number], index: '2dsphere'},
  fbid: String,
  token: String,
  name: String,
  face: String,
  email: String,
  profile: {
    gender: String,
    age: Number,
    icons: [],
    keywords: []
  },
  location: {
    host: Boolean,
    myPlace: {
      rent: Number,
      zipCode: Number,
      genders: Number,
      openRooms: Number,
      roomType: String,
      occupants: Number,
      zipCode: Number,
      city: String,
      state: String,
      latitude: Number,
      longitude: Number
    },
    desiredPlace: {
      rent: Number,
      zipCode: Number,
      radius: Number,
      roomType: String,
      city: String,
      state: String,
      latitude: Number,
      longitude: Number
    }
  },
  roommatePreferences: {
    gender: String,
    ageMin: Number,
    ageMax: Number
  },
  candidates: [{type: mongoose.Schema.Types.ObjectId}],
  liked: [{type: mongoose.Schema.Types.ObjectId}],
  skipped: [],
  matched: {}
})

var User = mongoose.model('User', UserSchema)

module.exports = User;

