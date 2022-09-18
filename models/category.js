const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_cht: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Category', categorySchema)