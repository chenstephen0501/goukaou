if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const productData = require('./product.json')
const Product = require('../product.js')
const Category = require('../category.js')
const db = require('../../config/mongoose.js')
db.once('open', async () => {
  try {
    const categoryData = await Category.find()
    console.log(categoryData)
    productData.forEach( async (item, index, arr) => {
      try {
        const category_id = categoryData.find(item2 => item2.category === item.category).id
        console.log(index, category_id)
        await Product.create({ ...item, categort_id })
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
