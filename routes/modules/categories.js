const express = require('express')
const router = express.Router()
const Category = require('../../models/category.js')

router.get('/', (req, res) => {
  return Category
    .find()
    .lean()
    .sort({ categoryId: 'asc' })
    .then(categories => {
      return res.render('admin/categories', { categories })
    })
})

router.post('/', (req, res) => {
  const { name, name_cht } = req.body
  if (!name) { 
    return res.redirect('/admin/categories')
  }
  return Promise.all([
    Category.find().lean(),
    Category.findOne({ name }).lean()
  ])
  .then(([categories, category]) => {
      if (!category) {
        return Category.create({ name, name_cht })
        .then(() => {
          return res.redirect('back')
        })
      }
      return res.render('admin/categories', { categories,category })
    })
  .catch(err => console.error(err))
})

router.get('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId
  return Promise.all([
    Category.find().lean(),
    Category.findById(categoryId).lean()
  ])
    .then(([categories, category]) => {
      return res.render('admin/categories', { categories, category })
    })
    .catch(err => console.error(err))
})

router.put('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId
  const { name, name_cht } = req.body
  if (!name) {
    return res.redirect('/admin/categories')
  }
  return Promise.all([
    Category.findById({ _id: categoryId }),
    Category.find().lean()
    ])
    .then(([category, categories]) => {
      const checkName = categories.some(c => c.name === name)
      if (checkName) {
        return res.redirect('/admin/categories')
      }
      return category.updateOne({ name, name_cht })
        .then(() => res.redirect('/admin/categories'))
    })
    .catch(err => console.error(err))
})

module.exports = router