if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const modelData = require('./model.json')
const Model = require('../model.js')
const db = require('../../config/mongoose.js')
db.once('open', () => {
  modelData.forEach(async (item, index, arr) => {
    try {
      await Model.create(item)
      if (index + 1 === arr.length) {
        console.log('Model created is done.')
        db.close()
      }
    } catch (err) {
      console.error(errrr)
    }
  })
})