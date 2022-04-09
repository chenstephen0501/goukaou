if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const productData = require('./product.json')
const Product = require('../product.js')
const db = require('../../config/mongoose.js')
db.once('open', () => {
  productData.forEach( async (item, index, arr) => {
    try {
      await Product.create(item)
      if (index + 1 === arr.length) {
        console.log('created is done')
        db.close()
      }
    } catch(err) {
      console.warn(err)
    }
  })
})
