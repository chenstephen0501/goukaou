if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const categoryData = require('./category.json')
const Category = require('../category.js')
const db = require('../../config/mongoose.js')
db.once('open', () => {
  categoryData.forEach( async (item, index, arr) => {
    try {
      await Category.create(item)
      if (index + 1 === arr.length) {
        console.log('Category created is done')
        db.close()
      }
    } catch(err) {
      console.warn(err)
    }
  })
})