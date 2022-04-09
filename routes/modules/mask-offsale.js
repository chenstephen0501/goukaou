const express = require('express')
const router = express.Router()
const Product = require('../../models/product.js')

router.get('/', (req, res) => {
  return Product.find({ production: 'false', category: 'mask' })
    .lean()
    .then((products) => {
      res.render('mask-offsale', { products })
    })
    .catch((err) => console.error(err))
})

module.exports = router


