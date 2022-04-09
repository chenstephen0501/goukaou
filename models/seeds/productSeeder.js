if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const productData = require('./product.json')
const Product = require('../product.js')
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.once('open', () => {
  console.log('mongodb is connected.')
  // return
  //   Product.create({
  //     name: products[0].name,
  //     model: products[0].model,
  //     production: products[0].production,
  //     introduction: products[0].introduction,
  //     category: 'mask',
  //     basePrice: 930,
  //     sampleImg: products[0].sampleImg,
  //     image: products[0].imgUrl,
  //   })
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
    // return Product.insertMany(productData)
    // .then(() => {
    //   console.log('created is done')
    //   db.close()
    // })
    // .catch((err) => console.error(err))
})
