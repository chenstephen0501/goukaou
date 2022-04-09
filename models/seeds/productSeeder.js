const mongoose = require('mongoose')
const products = require('../../products2.json')
const Product = require('../product.js')
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
// const { Specification } = products.model
console.log(typeof products.name)
console.log(typeof products)
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
  return Product.insertMany(products)
  .then(() => {
    console.log('created is done')
    db.close()
  })
  .catch((err) => console.error(err))
  
})