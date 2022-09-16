const express = require('express')
const router = express.Router()
const Product = require('../../models/product.js') 

router.get('/', (req, res) => {
  return Product.find()
    .lean()
    .then(product => {
      return res.render('admin/products', { product })
    })
})

module.exports = router