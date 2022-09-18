const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')

router.get('/', (req, res) => {
  return Category
    .find()
    .lean()
    .then(categories => {
      return res.render('admin/categories', { categories })
    })
})

module.exports = router