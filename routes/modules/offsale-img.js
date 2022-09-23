const express = require('express')
const router = express.Router()
const Product = require('../../models/product.js')

router.get('/:_id', (req, res) => {
  const _id = req.params._id
  return Product.findOne({ _id })
    .lean()
    .then((product) => {
      res.render('offsale-img', { product: product })
    })
    .catch((err) => console.error(err))
})

module.exports = router
