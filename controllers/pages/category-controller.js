const Category = require('../../models/category.js')

const categoryServices = require('../../services/categories-services.js')

const categoryController = {
  getCategories: (req, res) => {
    categoryServices.getCategories(req, (err, data) => err ? next(err) : res.render('admin/categories', data))

  },
  postCategory: (req, res) => {
    const { name, name_cht } = req.body
    if (!name) throw new Error('類別名稱不能為空白!')
    return Promise.all([
      Category.find().lean(),
      Category.findOne({ name }).lean()
    ])
      .then(([categories, category]) => {
        if (!categories) throw new Error('找不到所有類別資料!')
        if (category) {
          return res.render('admin/categories', { categories, category })
        }
        return Category.create({ name, name_cht })
          .then((category) => {
            req.flash('success_messages', '新增類別成功。')
            return res.redirect('/admin/categories')
          })
      })
      .catch(err => console.log(err))
  },
  getCategory: (req, res, next) => {
    const categoryId = req.params.categoryId
    return Promise.all([
      Category.find().lean(),
      Category.findById(categoryId).lean()
    ])
      .then(([categories, category]) => {
        if (!categories) throw new Error('找不到所有類別資料!')
        if (!category) throw new Error('找不到這個類別資料!')
        return res.render('admin/categories', { categories, category })
      })
      .catch(err => next(err))
  },
  putCategory: (req, res, next) => {
    const categoryId = req.params.categoryId
    const { name, name_cht } = req.body
    if (!name) {
      return res.redirect('/admin/categories')
    }
    return Promise.all([
      Category.find({ _id: { $nin: [categoryId] } }).lean(),
      Category.findById(categoryId).lean()
    ])
      .then(([categories, category]) => {
        if (!categories) throw new Error('找不到所有類別資料!')
        if (!category) throw new Error('找不到這個類別資料!')
        const checkName = categories.some(c => c.name === name)
        if (checkName) {
          req.flash('error_messages', '這個名稱已被使用!')
          return res.redirect('back')
        }
        return Category.updateOne({ _id: categoryId }, { name, name_cht })
          .then(() => {
            req.flash('success_messages', '編輯成功!')
            return res.redirect('/admin/categories')
          })
      })
      .catch(err => next(err))
  },
  deleteCategory: (req, res) => {
    const categoryId = req.params.categoryId
    return Category.findById({ _id: categoryId })
      .then(category => {
        if (!category) throw new Error('找不到這個類別資料!')
        return category.remove()
      })
      .then(() => res.redirect('/admin/categories'))
      .catch(err => console.error(err))
  },
}

module.exports = categoryController