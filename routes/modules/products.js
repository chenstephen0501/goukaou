const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const fs = require('fs')

const Product = require('../../models/product.js')
const Category = require('../../models/category.js')

router.get('/', (req, res) => {
  return Product.find()
    .lean()
    .then(products => {
      return res.render('admin/products', { products })
    })
})

router.get('/create', (req, res) => {
  return Category.find()
    .then(categories => {
      console.log(categories)
      return res.render('admin/create-product', { categories })
    })
})

router.post('/', upload.fields([{ name: 'sampleImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 5 }]), (req, res) => {
  const { name, category, model, basePrice, highestPrice, production, introduction } = req.body
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
  if (files !== 0) {
    return Promise.all([
      getSampleImg(sampleImg),
      getImgUrl(imgUrl)
    ]).then(([productSampleImg, productImgUrl]) => {
      return Product.create({
        name,
        category,
        model,
        basePrice,
        highestPrice,
        production,
        introduction,
        sampleImg: sampleImg ? productSampleImg : null,
        imgUrl: imgUrl ? productImgUrl : null
      })
        .then(product => {
          console.log(product)
          return res.redirect('/admin/products')
        })
    })
  } else {
    return Product.create({
      name,
      category,
      model,
      basePrice,
      highestPrice,
      production,
      introduction,
      sampleImg: null,
      imgUrl: null
    })
      .then(product => {
        console.log('else', product)
        return res.redirect('/admin/products')
      })
  }
})

module.exports = router