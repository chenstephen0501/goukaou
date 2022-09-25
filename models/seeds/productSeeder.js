if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 產品資料
const productData = require('./product_2.json')

const Product = require('../product.js')
const Category = require('../category.js')
const Model = require('../model.js')
const db = require('../../config/mongoose.js')
const faker = require('faker')

const randomIndex = (arr) => (Math.floor(Math.random() * arr.length))

// 測試版種子資料
// db.once('open', async () => {
//   try {
//     const categoryData = await Category.find()
//     const modelData = await Model.find()
//       await Product.insertMany(Array.from({ length: 50 }, (i, _iIndex) => {
//       const category = categoryData[randomIndex(categoryData)]
//       const model = modelData[randomIndex(modelData)]
//         const imgUrl = Array.from({ length: Math.floor(Math.random() * 10) + 1 }).map((j, _jIndex) => {
//           return { name: faker.name.firstName('female'), url: `https://loremflickr.com/300/200/girl/?random=${Math.floor(Math.random() * 200)}` }
//         })
//       return i = {
//         name: faker.name.findName(undefined, undefined, 'female'),
//         category: category.name,
//         model: model.name,
//         basePrice: 0,
//         highestPrice: faker.datatype.number({
//           'min': 800,
//           'max': 1000
//         }),
//         production: faker.datatype.boolean(),
//         introduction: faker.lorem.text(),
//         categoryId: category._id,
//         modelId: model._id,
//         sampleImg: `https://loremflickr.com/300/200/girl/?random=${Math.floor(Math.random() * 100)}`,
//          imgUrl,
//       }
//     }))
//     console.log('Product created is done')
//     db.close()
//   } catch (err) {
//     console.warn(err)
//   }
// })

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
          console.log('Product created is done')
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
