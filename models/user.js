const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    dafault: true
  },
  createdAt:  {
    type: Date,
    dafault: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)