const mongoose = require('mongoose');
const {Schema}= mongoose;

const User = new Schema({
  name: {
    type: String,
  },
  userID: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: Number,
  },
});

module.exports = mongoose.model('user',User);