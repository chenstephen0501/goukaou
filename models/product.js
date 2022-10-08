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
    required: false,
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
    require: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  modelId: {
    type: Schema.Types.ObjectId,
    ref: 'Model',
    index: true,
    required: true
  },
  sampleImg: {
    type: String,
    required: false,
  },
  imgUrl: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema)