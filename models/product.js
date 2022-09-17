const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: true,
  },
  production: {
    type: Boolean,
    default: false,
  },
  introduction: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  highestPrice: {
    type: Number,
    require: false,
  },
  sampleImg: {
    type: String,
    required: false,
  },
  imgUrl: [],
})

module.exports = mongoose.model('Product', productSchema)