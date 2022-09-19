if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const productData = require('./product.json')
const Product = require('../product.js')
const Category = require('../category.js')
const Model = require('../model.js')
const db = require('../../config/mongoose.js')
db.once('open', async () => {
  try {
    const categoryData = await Category.find()
    const modelData = await Model.find()
    productData.forEach( async (item, index, arr) => {
      try {
        const categoryId = categoryData.find(item2 => item2.name === item.category).id
        const modelId = modelData.find(item2 => item2.name === item.model).id
        await Product.create({ ...item, categoryId, modelId })
        if (index + 1 === arr.length) {
          console.log('Product created is done')
          db.close()
        }
      } catch(err) {
        console.warn(err)
      }
    })
  } catch(err) {
    console.warn(err)
  }
})
