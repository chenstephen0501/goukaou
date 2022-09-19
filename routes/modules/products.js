const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const fs = require('fs')

const Product = require('../../models/product.js')
const Category = require('../../models/category.js')
const Model = require('../../models/model.js')

router.get('/', (req, res) => {
  return Product.find()
    .lean()
    .then(products => {
      return res.render('admin/products', { products })
    })
    .catch(err => console.error(err))
})

router.get('/create', (req, res) => {
  return Promise.all([
    Category.find().lean(),
    Model.find().lean()   
  ])
    .then(([categories, models]) => {
      return res.render('admin/create-product', { categories, models })
    })
    .catch(err => console.error(err))
})

router.post('/', upload.fields([{ name: 'sampleImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 5 }]), (req, res) => {
  const { name, categoryId, model, basePrice, highestPrice, production, introduction } = req.body
  const { files } = req.files
  const { sampleImg, imgUrl } = req.files
  let sampleImgData
  let ImgUrlData

  const getSampleImg = file => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null)
      const fileName = `upload/${file[0].originalname}`
      fs.readFile(file[0].path, (err, data) => {
        if (err) return reject('Error: ', err)
        fs.writeFile(fileName, data, () => {
          return resolve(`/${fileName}`)
        })
      })
    })
  }
  const getImgUrl = files => {
    if (!files) return null
    return Promise.all(
      files.map((file, fileIndex) => {
        const fileName = `upload/${file.originalname}`
        return fs.promises.readFile(file.path)
          .then(data => fs.promises.writeFile(fileName, data))
          .then((data) => ({ name: file.originalname, url: `/${fileName}` }))
      }))
      .catch(err => console.log(err))
  }
  
  if (sampleImg || imgUrl) {
    return Promise.all([
      getSampleImg(sampleImg),
      getImgUrl(imgUrl),
      Category.find()
    ]).then(([productSampleImg, productImgUrl, categories]) => {
      const category = categories.find(item => item._id.toString() === categoryId.toString()).name
      return Product.create({
        name,
        category,
        model,
        basePrice,
        highestPrice,
        production,
        introduction,
        sampleImg: sampleImg ? productSampleImg : null,
        imgUrl: imgUrl ? productImgUrl : null,
        categoryId
      })
        .then(product => {
          return res.redirect('/admin/products')
        })
    })
      .catch(err => console.error(err))
  } else {
  return Category
    .find()
    .then(categories => {
      const category = categories.find(item => item._id.toString() === categoryId.toString()).name
      return Product.create({
        name,
        category,
        model,
        basePrice,
        highestPrice,
        production,
        introduction,
        sampleImg: null,
        imgUrl: null,
        categoryId
      })    
    })
    .then(product => {
      return res.redirect('/admin/products')
    })
    .catch(err => console.error(err))
  }
})

module.exports = router