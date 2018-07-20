const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  sex: String,
  birthDate: Date,
  createAt: {type: Date, default: Date.now()},
})

const User = mongoose.model('user', userSchema);

module.exports = User;