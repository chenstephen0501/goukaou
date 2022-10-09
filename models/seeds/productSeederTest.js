if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Product = require('../product.js')
const Category = require('../category.js')
const Model = require('../model.js')
const db = require('../../config/mongoose.js')
const faker = require('faker')

const randomIndex = (arr) => (Math.floor(Math.random() * arr.length))

// 測試版種子資料
db.once('open', async () => {
  try {
    const categoryData = await Category.find()
    const modelData = await Model.find()
      await Product.insertMany(Array.from({ length: 50 }, (i, _iIndex) => {
      const category = categoryData[randomIndex(categoryData)]
      const model = modelData[randomIndex(modelData)]
        const imgUrl = Array.from({ length: Math.floor(Math.random() * 10) + 1 }).map((j, _jIndex) => {
          return { name: faker.name.firstName('female'), url: `https://loremflickr.com/300/200/girl/?random=${Math.floor(Math.random() * 200)}` }
        })
      return i = {
        name: faker.name.findName(undefined, undefined, 'female'),
        category: category.name,
        model: model.name,
        basePrice: 0,
        highestPrice: faker.datatype.number({
          'min': 800,
          'max': 1000
        }),
        production: faker.datatype.boolean(),
        introduction: faker.lorem.text(),
        categoryId: category._id,
        modelId: model._id,
        sampleImg: `https://loremflickr.com/300/200/girl/?random=${Math.floor(Math.random() * 100)}`,
         imgUrl,
        createdAt: faker.date.past()
      }
    }))
    console.log('ProductTest created is done.')
    db.close()
  } catch (err) {
    console.warn(err)
  }
})