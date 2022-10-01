const nodemailer = require('nodemailer')
const Product = require('../models/product.js')

const linkData = [
  {
    model: 'ZENTAI SUIT GPZ-02',
    url: 'http://goukaou.blog131.fc2.com/blog-entry-424.html',
  },
  {
    model: 'ZENTAI SUIT GPZ-02-C',
    url: 'http://goukaou.blog131.fc2.com/blog-entry-359.html',
  },
  {
    model: 'Super Thick Zentai Suit GPZ-03',
    url: 'http://goukaou.blog131.fc2.com/blog-entry-449.html',
  },
  {
    model: 'Zentai Suit GPZ-04',
    url: 'http://goukaou.blog131.fc2.com/blog-entry-511.html',
  },
]

const productServices = {
  getMaskOnSale: (req, cb) => {
    return Product.find({ production: 'true', category: 'mask' })
    .lean()
    .then((products) => {
      const data = products.map(p => {
        return {
          ...p,
          introduction: p.introduction.substring(0, 100)
        }
      })
      return cb(null, {
        products: data
      })
    })
    .catch((err) => cb(err))
},
  getMaskOffSale: (req, cb) => {
    return Product.find({ production: 'false', category: 'mask' })
      .lean()
      .then((products) => {
        const data = products.map(p => {
          return {
            ...p,
            introduction: p.introduction.substring(0, 100)
          }
        })
        return cb(null, {
          products: data
        })
      })
      .catch((err) => cb(err))
  }
}

module.exports = productServices