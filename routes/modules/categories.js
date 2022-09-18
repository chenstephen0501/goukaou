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
          return res.redirect(`/admin/categories/${category/categoryId}`, { categories })
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

router.put('/categoryId', (req, res) => {
  const categoyId = req.params.categoryId
  const { name, name_cht } = req.body
  if (!name) {
    return res.redirect('/admin/categories')
  }
  return Promise.all([
    Category.find().lean(),
    Category.findById(categoryId).lean()
  ])
    .then(([categories, category]) => {
      console.log(category)
      const newCategory = { ...category, name, name_cht }
      return Category.save(newCategory)
    })
    .then(() => res.rediect('/admin/categoies'))
    .catch(err => console.error(err))
})

module.exports = router