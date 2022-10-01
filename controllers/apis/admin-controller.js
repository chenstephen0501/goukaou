const Product = require('../../models/product.js')
const Category = require('../../models/category.js')
const Model = require('../../models/model.js')
// const passport = require('../config/passport.js')

const { getSkip, getPagenation } = require('../../tools/pagination.js')
const { imgurFileHandler, imgurManyFileHandler
} = require('../../tools/file-heplers.js')

const adminServices = require('../../services/admin-services.js')

const adminController = {
  //  ADMIN PRODUCT 路由
  loginPage: (req, res) => {
    res.render('admin/login')
  },
  // login: passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/admin/login',
  //   failureFlash: true

  // }),
  // logout: (req, res, next) => {
  //   req.flash('success_messages', '成功登出')
  //   req.logout()
  //   res.redirect('/admin/login')
  // },
  getProducts: (req, res, next) => {
    adminServices.getProducts(req, (err, data) => err ? next(err) : res.json(data))
  },
  createProduct: (req, res, next) => {
    adminServices.createProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  postProduct: (req, res, next) => {
    adminServices.postProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  getProduct: (req, res, next) => {
    adminServices.getProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  editProduct: (req, res, next) => {
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
  },
  putProduct: (req, res, next) => {
    const productId = req.params.productId
    const { name, categoryId, basePrice, highestPrice, production, introduction, modelId } = req.body
    const { sampleImg, imgUrl } = req.files
    if (sampleImg || imgUrl) {
      return Promise.all([
        Product.find({ _id: { $nin: [productId] } }).lean(),
        imgurFileHandler(sampleImg),
        imgurManyFileHandler(imgUrl),
        Product.findById(productId).lean(),
        Category.find().lean(),
        Model.find().lean()
      ])
        .then(([products, productSampleImg, productImgUrl, product, categories, models]) => {
          const checkName = products.some(p => p.name === name)
          if (checkName) throw new Error('這個名稱己用過，請更換!')
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
        Product.find({ _id: { $nin: [productId] } }).lean(),
        Product.findById(productId).lean(),
        Category.find().lean(),
        Model.find().lean()
      ])
        .then(([products, product, categories, models]) => {
          const checkName = products.some(p => p.name === name)
          if (checkName) throw new Error('這個名稱己用過，請更換!')
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
  },
  deleteProduct: (req, res) => {
    const productId = req.params.productId
    return Product
      .findById(productId)
      .lean()
      .then(product => {
        if (!product) throw new Error('找不到這個產品!')
        return Product.deleteOne({ _id: productId })
      })
      .then(() => res.redirect('/admin/products'))
      .catch(err => console.error(err))
  }
}

module.exports = adminController