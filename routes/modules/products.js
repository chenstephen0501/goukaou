const express = require('express')
const router = express.Router()

const upload = require('../../middleware/multer.js')
const { getSkip, getPagenation } = require('../../tools/pagination.js')
const { localFileHandler, localManyFileHandler, imgurFileHandler, imgurManyFileHandler
} = require('../../tools/file-heplers.js')

const Product = require('../../models/product.js')
const Category = require('../../models/category.js')
const Model = require('../../models/model.js')

router.get('/', (req, res) => {
  const DEFAULT_LIMIT = 8
  const limit = Number(req.params.limit) || DEFAULT_LIMIT
  const page = Number(req.query.page) || 1
  return Promise.all([
    Product.find()
      .lean()
      .sort({ _id: 'asc' })
      .limit(limit)
      .skip(getSkip(page, limit)),
    Product.countDocuments()
  ])
    .then(([products, productCount]) => {
      if (!products) throw new Error('找不到產品!')
      if (!productCount) throw new Error('找不到產品數量!')
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
      if (!categories) throw new Error('找不到類別資料!')
      if (!models) throw new Error('找不到模型資料!')
      return res.render('admin/create-product', { categories, models })
    })
    .catch(err => console.error(err))
})

router.post('/', upload.fields([{ name: 'sampleImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 5 }]), (req, res, next) => {
  const { name, categoryId, basePrice, highestPrice, production, introduction, modelId } = req.body
  const { sampleImg, imgUrl } = req.files
  if (!name || !categoryId || !basePrice, !highestPrice || !production || !modelId) throw new Error('新增的產品所有欄位都要填寫。')
  if (sampleImg || imgUrl) {
    return Promise.all([
      Product.findOne({ name }).lean(),
      imgurFileHandler(sampleImg),
      imgurManyFileHandler(imgUrl),
      Category.find(),
      Model.find()
    ]).then(([product, productSampleImg, productImgUrl, categories, models]) => {
      if (product) throw new Error('這個名稱己用過，請更換!')
      if (!categories) throw new Error('找不到類別資料!')
      if (!models) throw new Error('找不到模型資料!')
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
          req.flash('success_messages', '成功新增產品。')
          return res.redirect('/admin/products')
        })
    })
      .catch(err => next(err))
  } else {
    return Promise.all([
      Product.findOne({ name }).lean(),
      Category.find(),
      Model.find()
    ])
      .then(([product, categories, models]) => {
        if (product) throw new Error('這個名稱己用過，請更換!')
        if (!categories) throw new Error('找不到類別資料!')
        if (!models) throw new Error('找不到模型資料!')
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
          sampleImg: null,
          imgUrl: null,
          categoryId,
          modelId
        })
      })
      .then(product => {
        req.flash('success_messages', '成功新增產品。')
        return res.redirect('/admin/products')
      })
      .catch(err => next(err))
  }
})

router.get('/:productId', (req, res, next) => {
  const productId = req.params.productId
  return Product
    .findById(productId)
    .lean()
    .then(product => {
      if (!product) throw new Error('找不到此產品!')
      return res.render('admin/product', { product })
    })
    .catch(err => next(err))
})

router.get('/:productId/edit', (req, res, next) => {
  const productId = req.params.productId
  return Promise.all([
    Product.findById(productId).lean(),
    Category.find().lean(),
    Model.find().lean()
  ])
    .then(([product, categories, models]) => {
      if (!product) throw new Error('找不到這個產品!')
      if (!categories) throw new Error('找不到類別資料!')
      if (!models) throw new Error('找不到模型資料!')
      return res.render('admin/edit-product', { product, categories, models })
    })
    .catch(err => next(err))
})

router.put('/:productId', upload.fields([{ name: 'sampleImg', maxCount: 1 }, { name: 'imgUrl', maxCount: 5 }]), (req, res, next) => {
  const productId = req.params.productId
  const { name, categoryId, basePrice, highestPrice, production, introduction, modelId } = req.body
  const { sampleImg, imgUrl } = req.files
  if (sampleImg || imgUrl) {
    return Promise.all([
      imgurFileHandler(sampleImg),
      imgurManyFileHandler(imgUrl),
      Product.findById(productId).lean(),
      Category.find().lean(),
      Model.find().lean()
    ])
      .then(([productSampleImg, productImgUrl, product, categories, models]) => {
        if (!product) throw new Error('找不到這個產品!')
        if (!categories) throw new Error('找不到類別資料!')
        if (!models) throw new Error('找不到模型資料!')
        const category = categories.find(item => item._id.toString() === categoryId.toString()).name
        const model = models.find(item => item._id.toString() === modelId.toString()).name
        return Product.updateOne({ _id: productId },
          {
            name,
            category,
            model,
            basePrice,
            highestPrice,
            production,
            introduction,
            sampleImg: sampleImg ? productSampleImg : product.sampleImg,
            imgUrl: imgUrl ? productImgUrl : product.imgUrl,
            categoryId,
            modelId
          })
      })
      .then(() => {
        req.flash('success_messages', '成功編輯產品。')
        return res.redirect('/admin/products')
      })
      .catch(err => next(err))
  } else {
    return Promise.all([
      Product.findById(productId).lean(),
      Category.find().lean(),
      Model.find().lean()
    ])
      .then(([product, categories, models]) => {
        if (!product) throw new Error('找不到這個產品!')
        if (!categories) throw new Error('找不到類別資料!')
        if (!models) throw new Error('找不到模型資料!')
        const category = categories.find(item => item._id.toString() === categoryId.toString()).name
        const model = models.find(item => item._id.toString() === modelId.toString()).name
        if (!product) throw new Error('找不到這個產品!')
        return Product.updateOne({ _id: productId },
          {
            name,
            category,
            model,
            basePrice,
            highestPrice,
            production,
            introduction,
            sampleImg: sampleImg ? productSampleImg : product.sampleImg,
            imgUrl: imgUrl ? productImgUrl : product.imgUrl,
            categoryId,
            modelId
          })
      })
      .then(() => {
        req.flash('success_messages', '成功編輯產品。')
        res.redirect('/admin/products')
      })
      .catch(err => next(err))
  }
})

router.delete('/:productId', (req, res) => {
  const productId = req.params.productId
  return Product
    .findById(productId)
    .lean()
    .then(product => {
      if (!product) throw new Error('找不到這個產品!')
      return Product.deleteOne({ _id: productId })
    })
    .then(() => res.redirect('back'))
    .catch(err => console.error(err))
})

module.exports = router