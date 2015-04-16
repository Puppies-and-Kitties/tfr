var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  fbid: Number,
  name: String,
  face: String,
  email: String,
  match: Boolean,
  likedCurrentUser: Boolean,
  // profile: {
    // myPlace: {
    //   peopleCount: Number,
    //   genders: String,
    //   rent: Number,
    //   zipCode: Number
    // },
  profile: {
    gender: String,
    age: Number,
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
  candidates: [],
  liked: [],
  skipped: [],
  matched: []
})

var User = mongoose.model('User', UserSchema)

module.exports = User;

