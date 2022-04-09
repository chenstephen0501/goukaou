const express = require('express')
const router = express.Router()
const Product = require('../../models/product.js')

router.get('/', (req, res) => {
  return Product.find({ production: 'true', category: 'mask' })
    .lean()
    .then((products) => {
      res.render('mask-onsale', { products })
    })
    .catch((err) => console.error(err))
})

module.exports = router
