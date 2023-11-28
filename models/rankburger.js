const mongoose = require("mongoose");
const rankburgerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('rankBurger', rankburgerSchema)