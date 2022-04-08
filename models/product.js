const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
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
    required: true,
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
    required: true,
  },
  imgUrl: [],
})

module.exports = mongoose.model('Product', productSchema)