var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  id: Number,
  // profile: {
    // myPlace: {
    //   peopleCount: Number,
    //   genders: String,
    //   rent: Number,
    //   zipCode: Number
    // },
  gender: String,
  age: Number,
  keywords: [],
  location: {
    host: Boolean,
    myPlace: {
      rent: Number,
      zipCode: Number,
      genders: Number,
      openRooms: Number,
      roomType: String,
      occupants: Number,
      zipCode: Number
    },
    desiredPlace: {
      rent: Number,
      zipCode: Number,
      radius: Number,
      roomType: String
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

