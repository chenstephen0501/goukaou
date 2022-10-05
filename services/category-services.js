
const Category = require('../models/category.js')

const categoryServices = {

  getCategories: (req, cb) => {
    return Category
      .find()
      .lean()
      .sort({ categoryId: 'asc' })
      .then(categories => {
        if (!categories) {
          const err = new Error('找不到所有類別資料')
          err.status = 404
          throw err
        }
        cb(null, { categories })
      })
      .catch(err => cb(err))
  },
  postCategory: (req, cb) => {
    const { name, name_cht } = req.body
    if (!name) {
      const err = new Error('類別名稱不能為空白。')
      err.status = 404
      throw err
    }
    return Promise.all([
      Category.find().lean(),
      Category.findOne({ name }).lean()
    ])
      .then(([categories, category]) => {
        if (!categories) {
          const err = new Error('找不到所有類別資料')
          err.status = 404
          throw err
        }
        if (category) {
          const err = new Error(`名稱 [${name}] 己經被使用過，請更換!`)
          err.status = 404
          throw err
        }
        return Category.create({ name, name_cht })
          .then((createCategory) => {
            cb(null, { category: createCategory })
          })
      })
      .catch(err => cb(err))
  },
  getCategory: (req, cb) => {
    const categoryId = req.params.categoryId
    return Promise.all([
      Category.find().lean(),
      Category.findById(categoryId).lean()
    ])
      .then(([categories, category]) => {
        if (!categories) {
          const err = new Error('找不到所有類別資!')
          err.status = 404
          throw err
        }
        if (!category) {
          const err = new Error('找不到這個類別資料!')
          err.status = 404
          throw err
        }
        return cb(null, { categories, category })
      })
      .catch(err => cb(err))
  },
  putCategory: (req, cb) => {
    const categoryId = req.params.categoryId
    const { name, name_cht } = req.body
    if (!name) {
      const err = new Error('類別名稱不能為空!')
      err.status = 404
      throw err
    }
    return Promise.all([
      Category.find({ _id: { $nin: [categoryId] } }).lean(),
      Category.findById(categoryId)
    ])
      .then(([categories, category]) => {
        if (!categories) {
          const err = new Error('找不到所有類別資!')
          err.status = 404
          throw err
        }
        if (!category) {
          const err = new Error('找不到這個類別資料!')
          err.status = 404
          throw err
        }
        const checkName = categories.some(c => c.name === name)
        if (checkName) {
          const err = new Error(`名稱 [${name}] 己經被使用過，請更換!`)
          err.status = 404
          throw err
        }
        category.name = name
        category.name_cht = name_cht
        return category.save()
      })
      .then((updateCategory) => {
        return cb(null, { category: updateCategory })
      })
      .catch(err => cb(err))
  },
  deleteCategory: (req, cb) => {
    const categoryId = req.params.categoryId
    return Category.findById(categoryId)
      .then(category => {
        if (!category) {
          const err = new Error('找不到這個類別資料!')
          err.status = 404
          throw err
        }
        return category.remove()
      })
      .then((deleteCategory) => {
        return cb(null, { category: deleteCategory })
      })
      .catch(err => cb(err))
  }
}

module.exports = categoryServices