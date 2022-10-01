const Product = require('../models/product.js')
const Category = require('../models/category.js')
const Model = require('../models/model.js')
const passport = require('../config/passport.js')

const { getSkip, getPagenation } = require('../tools/pagination.js')
const { imgurFileHandler, imgurManyFileHandler
} = require('../tools/file-heplers.js')

const adminController = {
  getProducts: (req, cb) => {
    1
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
        const data = products
        cb(null, { products: data, pagenation: getPagenation(page, limit, productCount) })
        // return res.render('admin/products', { products, pagenation: getPagenation(page, limit, productCount) })
      })
      .catch(err => console.error(err))
  },
}

module.exports = adminController