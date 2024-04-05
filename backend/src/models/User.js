// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  sender_address: String,
  private_key: String,
   // You should hash passwords securely
});

module.exports = mongoose.model('User', userSchema);