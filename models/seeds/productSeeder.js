if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 產品資料
const productData = require('./product.json')

const Product = require('../product.js')
const Category = require('../category.js')
const Model = require('../model.js')
const db = require('../../config/mongoose.js')
const faker = require('faker')

db.once('open', async () => {
  try {
    const categoryData = await Category.find()
    const modelData = await Model.find()
    productData.forEach(async (item, index, arr) => {
      try {
        const categoryId = categoryData.find(item2 => item2.name === item.category).id
        const modelId = modelData.find(item3 => item3.name === item.model).id
        if (item.category === 'mask') {
          item.imgUrl = item.imgUrl.map((img) => ({ ...img, name: faker.name.firstName('female')}))
        }
        await Product.create({
          ...item,
          categoryId,
          modelId,
          name: faker.name.findName(undefined, undefined, 'female')
        })
        if (index + 1 === arr.length) {
          console.log('Product created is done.')
          db.close()
        }
      } catch (err) {
        console.warn(err)
      }
    })
  } catch (err) {
    console.warn(err)
  }
})
