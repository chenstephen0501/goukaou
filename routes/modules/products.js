const express = require('express')
const router = express.Router()

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const fs = require('fs')

const Product = require('../../models/product.js')
const Category = require('../../models/category.js')
const Model = require('../../models/model.js')

router.get('/', (req, res) => {
  const DEFAULT_LIMIT = 8
  const limit = Number(req.params.limit) || DEFAULT_LIMIT
  const page = Number(req.query.page) || 1
  const getSkip = (page = 1, limit = 8) => ((page - 1) * limit)
  const getPagenation = (page = 1, limit = 8, total = 50 ) => {
    const totalPage = Math.ceil(total / limit)
    const pages = Array.from({ length: totalPage }, (_,index) => index + 1)
    const currentPage = page < 1 ? 1 : page > totalPage ? totalPage : page
    const prev = currentPage - 1 ? currentPage - 1 : 1
    const next = currentPage + 1 ? currentPage + 1 : totalPage
    return {
      totalPage,
      pages,
      prev,
      next,
      currentPage
    }
  }
  return Promise.all([
    Product.find()
    .lean()
    .sort({ _id: 'asc'})
    .limit(limit)
    .skip(getSkip(page, limit)),
    Product.countDocuments()
  ])
    .then(([products, productCount]) => {
      return res.render('admin/products', { products, pagenation: getPagenation(page, limit, productCount) })
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
  const { name, categoryId, model, basePrice, highestPrice, production, introduction, modelId } = req.body
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
      Category.find(),
      Model.find()
    ]).then(([productSampleImg, productImgUrl, categories, models]) => {
      const category = categories.find(item => item._id.toString() === categoryId.toString()).name
      const model = models.find(item => item._id.toString() === modelId.toString()).name
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
        categoryId,
        modelId
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

router.get('/:productId', (req, res) => {
  const productId = req.params.productId
  return Product
    .findById(productId)
    .lean()
    .then(product => {console.log(product)
      return res.render('admin/product', { product })
    })
    .catch(err => console.error(err))
})

router.get('/:productId/edit', (req, res) => {
  const productId = req.params.productId
  return Promise.all([
    Product.findById(productId).lean(),
    Category.find().lean(),
    Model.find().lean()
  ])
    .then(([product, categories, models]) => {
      return res.render('admin/edit-product', { product, categories, models })
    })
    .catch(err => console.error(err)) 
})

module.exports = router