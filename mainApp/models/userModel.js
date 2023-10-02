const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  tokens: {
    type: Array,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
