
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
}

module.exports = categoryServices 